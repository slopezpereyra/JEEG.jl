var documenterSearchIndex = {"docs":
[{"location":"#EEGToolkit.jl","page":"Home","title":"EEGToolkit.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Computational EEG analysis with emphasis in sleep neuroscience.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Developed at the Laboratory for the Study of Sleep Slow-wave activity","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"The Gods of the earth and sea\nSought thro' Nature to find this Tree,\nBut their search was all in vain:\nThere grows one in the Human Brain.— William Blake","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package has three aims: ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Simplicity\nTransparency\nEfficiency","category":"page"},{"location":"","page":"Home","title":"Home","text":"Simplicity means that a person with little programming background should be able to use it, at least with the documentation at hand. Transparency means that any methodology implemented by the package should be accessible enough so as to be reported in a scientific paper.  Efficiency means that large EEGs (e.g. sleep EEGs) should be processed and analyzed in minutes or less.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Transparency affects primarily power spectral analysis (PSA). Most packages  don't report how PSA is done. Proprietary software is typically even more obscure. Combined with the fact that PSA is not standardized and may be computed in several many ways, this makes it very difficult to compare and rest results. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package is free software—free as in freedom. You are free to use the code as you wish and for any purpose. You are free to study the code and change it to make it do what you wish. You are free to redistribute copies of this package to help others. You are free to distribute copies of any modified version of this package. Proprietary software hinders the liberty of its users. In science, it obscures the scientific process and makes replication and collaboration difficult. If you are a scientist, use free software whenever possible.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Package-Features","page":"Home","title":"Package Features","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Loading and processing EEG data\nEEG visualization\nSleep stage handling \nNREM Period detection\nPower spectral analysis\nSpindle detection algorithms","category":"page"},{"location":"#Time-series","page":"Home","title":"Time series","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"TimeSeries\nsegment\nepoch\ngen_time_domain","category":"page"},{"location":"#EEGToolkit.TimeSeries","page":"Home","title":"EEGToolkit.TimeSeries","text":"A struct representing time series data.\n\nFields\n\nx::Vector{<:AbstractFloat}: Time series data.\nfs::Integer: Sampling rate.\nepoch_length::Integer: Length in seconds understood to comprise an epoch (defaults to 30).\n\n\n\n\n\n","category":"type"},{"location":"#EEGToolkit.segment","page":"Home","title":"EEGToolkit.segment","text":"segment(v::Vector{T}, L::Int; overlap::Union{Float64,Int}=0, symmetric=false) where {T}\n\nSplits a vector v into segments of length L with an overlap overlap expressed as a fraction of L. The overlap defaults to 0 (no overlap). Returns a vector v of vectors - i.e. Vector{Vector{T}} - with vecv_i the ith segment in the split.\n\nThe function always attempts to capture the whole vector, even if the final split is not of length L. For example, \n\n> x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]\n> segment(x, 5)\n2-element Vector{Vector{Float64}}:\n[1, 2, 3, 4, 5]\n[6, 7, 8, 9, 0]\n\n > segment(x, 7)\n2-element Vector{Vector{Float64}}:\n [1, 2, 3, 4, 5, 6, 7]\n [8, 9, 0]\n\nSet symmetric=true to ensure that, if this occurs, the last split is dropped.\n\n> segment(x, 3; symmetric=true)\n3-element Vector{Vector{Float64}}:\n [1, 2, 3]\n [4, 5, 6]\n [7, 8, 9]\n\nIf L is equal to the segment length, segment raises a warning and returns a vector with only the original vector. The return  value ensures type-safety but the warning is raised because  splitting a vector over its very length is potentially  due to programming errors.\n\n\n\n\n\nsegment(ts::TimeSeries, L::Int, overlap::Union{Float64, Int})\n\nSplits the vector ts.x of a TimeSeries ts into segments of length L with an overlap overlap expressed as a fraction of L. \n\n\n\n\n\n","category":"function"},{"location":"#EEGToolkit.epoch","page":"Home","title":"EEGToolkit.epoch","text":"epoch(signal::TimeSeries, n::Integer)\n\nReturns a vector [x₁, …, xₖ] with all values xᵢ corresponding to the nth epoch in the signal.\n\n\n\n\n\nepoch(signal::TimeSeries, n::Integer, m::Integer)\n\nReturns a vector [x₁, …, xₖ] with all indexes corresponding to epochs n, n+1, …, m of the EEG. The default sampling rate is used to compute the indexes.\n\n\n\n\n\n","category":"function"},{"location":"#EEGToolkit.gen_time_domain","page":"Home","title":"EEGToolkit.gen_time_domain","text":"gen_time_domain(signal::TimeSeries, s::Union{AbstractFloat,Integer}, e::Union{AbstractFloat,Integer})\n\nGiven an TimeSeries, generates the time vector t₁, …, tₙ corresponding to  the signal from time s to e in seconds.\n\n\n\n\n\n","category":"function"},{"location":"#EEG","page":"Home","title":"EEG","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"EEG\nfilter_by_stage \nartifact_reject","category":"page"},{"location":"#EEGToolkit.EEG","page":"Home","title":"EEGToolkit.EEG","text":"A struct representing EEG data with associated metadata.\n\nFields\n\nsignals::Dict{String, TimeSeries}: A dictionary mapping signal labels (strings) to arrays of floating-point values.\nstaging::Vector{String}: A vector of stage labels corresponding to each epoch.\nid::String: An identifier for the EEG.\n\nConstructors\n\nEEG(file::String, epoch_length::Integer=30, staging::Vector{String}=[\"\"], id::String=\"\"): Constructs an EEG object from an EDF file (file) containing EEG data. The function reads the signals, computes the necessary metadata (fs, N, epoch_count), and initializes the EEG struct with the provided staging vector.\n\nExample\n\nstaging_vector = CSV.read(\"path/to/stage_data/eeg_staging.csv\") # A vector with a stage per each epoch in the EEG\neeg_data = EEG(\"path/to/edf_data/data.edf\", 30, staging_vector)\n\n# Alternatively, if no stage data exists, it is safe to do \neeg_data = EEG(\"path/to/edf_data/data.edf\", 30) # Staging vector defaults to [] if not provided\n\n# or simply\neeg_data = EEG(\"path/to/edf_data/data.edf\") # Epoch length defaults to 30 if not provided.\n\n\n\n\n\n","category":"type"},{"location":"#EEGToolkit.filter_by_stage","page":"Home","title":"EEGToolkit.filter_by_stage","text":"function filter_by_stage(eeg::EEG, channel::String, stages::Vector)\n\nReturns all portions of an EEG channel in a given stage of the staging vector.\n\n\n\n\n\n","category":"function"},{"location":"#EEGToolkit.artifact_reject","page":"Home","title":"EEGToolkit.artifact_reject","text":"artifact_reject(signal::TimeSeries, anom_matrix::Matrix)\n\nGiven an TimeSeries and a 2x2 matrix associating epoch-subepoch pairs with artifacts,  returns a new TimeSeries with all sub-epochs containing artifacts removed.\n\n\n\n\n\n","category":"function"},{"location":"#NREM-Period-detection","page":"Home","title":"NREM Period detection","text":"","category":"section"},{"location":"#NREM-period-definition","page":"Home","title":"NREM period definition","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Following Feinberg & Floyed and Dijk, a NREM period is a sequence of epochs satisfying the following conditions:","category":"page"},{"location":"","page":"Home","title":"Home","text":"It starts with stages 2, 3 or 4. \nIt contains at least 15 minutes of stages 2, 3 or 4 in total.\nIt ends with 5 or more minutes of REM, or with 5 or more minutes of wakefulness. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Epochs in the sequence are allowed to contain occurrences of REM sleep or wakefulness  in between, as long as the duration of this occurrences is less than 5 minutes. But the epochs corresponding to these occurrences will not be part of the NREM period. For example, in a stage sequence of the form","category":"page"},{"location":"","page":"Home","title":"Home","text":"... - 10m of stage two - 1m of REM - 5m of stage three - 5m of REM - ...","category":"page"},{"location":"","page":"Home","title":"Home","text":"the NREM period consists of the first 10 minutes of stage 2 and the 5 minutes of stage 3, ignoring the 1 minute of REM in-between them.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Importantly, the restriction that ending REM periods must last at least 5 minutes is not imposed when detecting the first and the last NREM period in a night of sleep.","category":"page"},{"location":"#NREM-detection-algorithm","page":"Home","title":"NREM detection algorithm","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Let n be the number of epochs corresponding to 15 minutes and m the number of epochs corresponding to 5 minutes. (In 30 second epochs, n = 30 m = 10). ","category":"page"},{"location":"","page":"Home","title":"Home","text":"The algorithm assumes that the  staging field of an EEG has been set to a vector vecs that contains only the strings 1 ldots 6  (with 5 marking REM, 6 wakefulness,  unknown/unstaged).","category":"page"},{"location":"","page":"Home","title":"Home","text":"The algorithm works by mapping vecs to alpha = s_1 ldots s_q a word over the language generated by Sigma = 1 ldots 6 .","category":"page"},{"location":"","page":"Home","title":"Home","text":"Observe that the language (5+6)^*(2+3+4)^*^* is partitioned into U and U, where U is the set of words containing at least n symbols 2 3 4 where neither 5 nor 6 occur consecutively m times. Then alpha can be decomposed into ","category":"page"},{"location":"","page":"Home","title":"Home","text":"alpha = psi_1 phi_1 psi_2 phi_2 ldots psi_k phi_k psi_k+1","category":"page"},{"location":"","page":"Home","title":"Home","text":"where phi_i = varphi_i (5^m5^* + 6^m6^*) and varphi_i in U. Such a decomposition readily provides the number of NREM periods in the EEG (i.e. k). Furthermore, the epochs which comprise these periods are easily inferable from the decomposition.","category":"page"},{"location":"","page":"Home","title":"Home","text":"nrem","category":"page"},{"location":"#EEGToolkit.nrem","page":"Home","title":"EEGToolkit.nrem","text":"nrem(staging::Vector, n::Integer=30, m::Integer=10)\n\nFinds the k underlying NREM periods in a staging vector. Returns a vector of vectors V s.t. the ith vector in V  contains the epochs which comprise the ith NREM period. Thus, the length of V is k the number of NREM periods.\n\nThe staging field of the EEG must have been set to a vector  containing only the symbols 1, …, 6, ? where 5 denotes  REM, 6 denotes wakefulness, and ? denotes unscored/unstaged.\n\n\n\n\n\nnrem(eeg::EEG, n::Integer=30, m::Integer=10)\n\nFinds the k underlying NREM periods in the staging vector  of an EEG.\n\n\n\n\n\n","category":"function"},{"location":"#Spindle-detection","page":"Home","title":"Spindle detection","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package implements two spindle detection algorithms discussed in O'Reilly and Nielsen (2015). We give a brief overview of them here but refer to their original publications for further detail.","category":"page"},{"location":"","page":"Home","title":"Home","text":"sigma_index\nrelative_spindle_power","category":"page"},{"location":"#EEGToolkit.sigma_index","page":"Home","title":"EEGToolkit.sigma_index","text":"function sigma_index(x::Vector{<:AbstractFloat}, fs::Integer)\n\nThe Sigma-index algorithm (Huupponen et al., 2007) find spindles by detecting abnormally high amplitudes values among the spindle frequency band. Per each 1 second window of the EEG,\n\nthe maximum amplitude in the spindle frequency, which we call S_max\nthe average amplitude in the low alpha and theta frequencies, which we call\n\nalpha_mean theta_mean\n\nthe maximum alpha amplitude alpha_max\n\nare all computed. The Sigma-index is defined to be zero if alpha_max  S_max, and otherwise\n\nf(S_max alpha_mean phi_mean) = frac2S_max alpha_mean + phi_mean  \n\nHigher values are indicative of a higher spindle probability. The rejection threshold recommended in the original paper is lambda = 45.\n\n\n\n\n\n","category":"function"},{"location":"#EEGToolkit.relative_spindle_power","page":"Home","title":"EEGToolkit.relative_spindle_power","text":"relative_spindle_power(x::Vector{<:AbstractFloat}, fs::Integer)\n\nThe Relative Spindle Power (RSP) algorithm (Devuyst et al., 2011)  also detects abnormal values along the spindle frequency band.  For every 1 second window, the amplitude spectrum S(t) is computed,  and the RSP is defined as\n\nRSP(t) = fracint_11^16 S(t f) dfint_05^40 S(t f) df\n\nThis definition is more intelligible than the that of the sigma index, insofar as it represents the ratio of the total power in the spindle band with respect to the total power in the delta to phi frequency range. It is evident by definition that 0 leq RSP leq 1. Higher values are indicative of a higher spindle probability (it should be clear that RSP is not a probability itself). The rejection threshold recommended in the original paper is lambda = 022.\n\n\n\n\n\n","category":"function"},{"location":"#Power-spectral-analysis","page":"Home","title":"Power spectral analysis","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AmplitudeSpectrum\nPSD\nplot_psd\nSpectrogram\nplot_spectrogram\nfreq_band \nmean_band_power","category":"page"},{"location":"#EEGToolkit.AmplitudeSpectrum","page":"Home","title":"EEGToolkit.AmplitudeSpectrum","text":"Structure for amplitude spectrum estimations. Estimations are by default  one sided, with frequencies ranging from [0, fₛ/2].\n\nThe formula used is \n\nfrac2H(f)sum_i w_i\n\nwith w_i a Hanning window.\n\nFields\n\nfreq::Vector{<:AbstractFloat}: Frequency range of the spectrum\nspectrum::Vector{<:AbstractFloat}: Estimated spectral amplitude\nformula::String: A string representation of the formula used for the estimation.\n\nConstructors\n\nAmplitudeSpectrum(x::Vector{<:AbstractFloat}, sampling_rate::Integer, pad::Integer) : Computes a direct PSD over a signal x with a given sampling_rate.\n\n\n\n\n\n","category":"type"},{"location":"#EEGToolkit.PSD","page":"Home","title":"EEGToolkit.PSD","text":"Structure for PSD estimations. Estimations are by default  one sided, with frequencies ranging from [0, fₛ/2].\n\nThe default formula is \n\nfrac2H(f)^2f_s sum_i w_i^2\n\nwith w_i a Hanning window. This means the estimation is normalized by  the sampling rate by default. This can be changed by setting the normalization  parameter equal to frac1f_s, canceling out the factor in the denominator. \n\nIf Barlett or Welch's mehtod is used (i.e. if the second constructor is used), the formula  becomes \n\nfrac1M varphi sum_i^M left frac2H_i(f)^2f_s sum_i w_i^2 right\n\nwhere w_1 ldots w_n a Hanning window, M the number of segments, H_i(f) the FFT of the ith segment of the signal, and varphi an optional normalization factor defined by the normalization parameter (defaults to 2 * seg_length). Thus, with default keyword arguments, and averaging across M windows with k samples each, the estimation is\n\nfrac1M\times 2k sum_i^M left frac2H_i(f)^2f_s sum_i w_i^2 right\n\nTo avoid any normalization, simply let arphi = 1.\n\nFields\n\nfreq::Vector{<:AbstractFloat}: Frequency range of the spectrum\nspectrum::Vector{<:AbstractFloat} : Estimated spectral density in dB.\nmethod::String: Estimation method used \nformula::String : A string representation of the formula used for the estimation.\n\nConstructors\n\nPSD(x::Vector, sampling_rate::Integer, pad::Integer = 0): Computes a direct PSD over a signal x with a given sampling_rate.\nPSD(x::Vector, fs::Int, L::Int, overlap::Union{ <:AbstractFloat, Integer }, normalization::Union{ <:AbstractFloat, Integer } = 1): Splits the signal x into segments of length L with an overlap in [0, 1). The overlap is understood to be a fraction of the segment length. PSD is estimated within and averaged across all segments. If overlap is zero, this results in Barlett's method. If overlap is greater than zero, this results in Welch's method. If pad is zero no zero-padding is done. If pad is greater than zero, each segment is zero-padded to a  length of pad. \nPSD(ts::TimeSeries): Splits the signal x into segments of length L with an overlap in [0, 1). The overlap is understood to be a fraction of the segment length. PSD is estimated within and averaged across all segments. If overlap is zero, this results in Barlett's method. If overlap is greater than zero, this results in Welch's method. If pad is zero no zero-padding is done. If pad is greater than zero, each segment is zero-padded to a  length of pad. \n\n\n\n\n\n","category":"type"},{"location":"#EEGToolkit.plot_psd","page":"Home","title":"EEGToolkit.plot_psd","text":"plot_psd(psd::PSD; freq_lim=30.0)\n\nPlot a PSD with x-axis being frequency and y-axis being estimated power spectrum.\n\n\n\n\n\n","category":"function"},{"location":"#EEGToolkit.Spectrogram","page":"Home","title":"EEGToolkit.Spectrogram","text":"Structure for spectrogram estimation. Estimations are by default one-sided, with frequencies ranging from [0, fₛ/2]. The signal is split into possibly overlapping  windows of length L; within each window, a PSD method is used to compute the  PSD with overlapping windows. \n\nThe spectrogram is a matrix S^M times F where M is the number of windows and  F is the length of the spectrum vector in any given window (i.e. the number of  frequencies or the frequency resolution). \n\nLet f_1 f_2 ldots f_k be a strictly increasing sequence of frequencies. Assume these frequencies correspond to the column indexes c_1 c2 ldots c_k of S. Then the mean power in the frequency range  f_1 f_k is\n\nfrac1M sum_i=1^Mleftfrac1c_k - c_1sum_j=c_1^c_k S_ijright = frac1Mbig(c_k - c_1big)sum_i=1^Msum_j=c_1^c_k S_ij\n\nIn this package, mean power in a frequency range is computed with the mean_band_power function.\n\nFields\n\ntime::Vector : Time domain (x)\nfreq::Vector{<:AbstractFloat}: Frequency domain (y)\nspectrums::Matrix{<:AbstractFloat}: Power spectrum (z). Rows are time and columns are frequency.\nsegment_length::Integer : Length of each segment in time.\n\nConstructors\n\nSpectrogram(signal::Vector{<:AbstractFloat}, fs::Integer, window_length::Integer, psd_function::Function; overlap::AbstractFloat = 0.5): Compute the spectrogram by splitting the signal into \n\npotentially overlapping windows of length window_length. Within each window, a psd_function is used to compute the PSD. This function must return a PSD object. psd_overlap parameters. An optional normalization factor and a zero-padding  length can be included, as in the PSD constructor.\n\nfunction Spectrogram(segs::Vector{Vector}, fs::Integer, segment_length::Integer, psd_function::Function; overlap::AbstractFloat = 0.5): This constructor does not take a signal but a split or windowed signal. This is useful, for example, when the EEG is split into windows corresponding to a specific period (e.g. NREM epochs). In this case, each time-instance in the Spectrogram corresponds to one of the windows. Aside from this, there is no difference with the previous constructor.\nfunction Spectrogram(ts::TimeSeries, window_length::Integer, psd_function::Function; kargs...): Simpler constructor using a TimeSeries object.\n\n\n\n\n\n","category":"type"},{"location":"#EEGToolkit.plot_spectrogram","page":"Home","title":"EEGToolkit.plot_spectrogram","text":"plot_spectrogram(spec::Spectrogram, freq_lim::AbstractFloat=30.0, type::Int=1, color=:nipy_spectral)\n\nPlots a spectogram spec either in 2d (type = 1) or 3d (type = 2). An optional  frequency limit (freq_lim) may be set (defaults to 30Hz). The color palette  color may be set; defaults to nipy_spectral.\n\n\n\n\n\n","category":"function"},{"location":"#EEGToolkit.freq_band","page":"Home","title":"EEGToolkit.freq_band","text":"freq_band(spec::Union{PSD,AmplitudeSpectrum}, lower::AbstractFloat, upper::AbstractFloat)\n\nGiven a PSD, returns a Vector{AbstractFloat} with the powers within the frequency band [lower, upper].\n\n\n\n\n\nfreq_band(spec::Spectrogram, lower::AbstractFloat, upper::AbstractFloat, window::Integer)\n\nGiven a spectrogram, returns a Vector{<:AbstractFloat} with the powers within a frequency band [lower, upper] of a specific window (row of the spectrogram).\n\n\n\n\n\nfreq_band(spec::Spectrogram, lower::AbstractFloat, upper::AbstractFloat)\n\nGiven a spectrogram, returns a Matrix{<:AbstractFloat} with the powers within a frequency band [lower, upper] across all windows.\n\n\n\n\n\n","category":"function"},{"location":"#EEGToolkit.mean_band_power","page":"Home","title":"EEGToolkit.mean_band_power","text":"freq_band(spec::Spectrogram, lower::AbstractFloat, upper::AbstractFloat, window::Integer)\n\nGiven a spectrogram, returns the mean power in a given frequency band [lower, upper]. This function  effectively computes \n\nfrac1Mbig(c_k - c_1big)sum_i=1^Msum_j=c_1^c_k S_ij\n\n\n\n\n\n","category":"function"},{"location":"#Helpers","page":"Home","title":"Helpers","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"next_power_of_two \nzero_pad ","category":"page"},{"location":"#EEGToolkit.next_power_of_two","page":"Home","title":"EEGToolkit.next_power_of_two","text":"next_power_of_two(n::Int)\n\nGiven an integer n, finds the least m = 2ᵏ s.t. m ≥ n.\n\n\n\n\n\n","category":"function"},{"location":"#EEGToolkit.zero_pad","page":"Home","title":"EEGToolkit.zero_pad","text":"zero_pad(v::Vector{<:AbstractFloat}, desired_length::Integer) where {T}\n\nZero-pads a numeric vector v to a desired_length\n\n\n\n\n\n","category":"function"},{"location":"#Examples","page":"Home","title":"Examples","text":"","category":"section"},{"location":"#NREM-delta-power","page":"Home","title":"NREM delta power","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This is an example script for computing the mean delta (delta) power in each of the NREM periods of a sleep EEG. We will use the C3 channel.","category":"page"},{"location":"","page":"Home","title":"Home","text":"# First, import the package\nusing EEGToolkit \n\n# Assuming we have the stage data in a .csv and we have some function \n# to read CSVs (e.g. from the CSV package)\nstaging = some_function_to_read_csv(\"my_staging_data.csv\")\n\n# We read an EEG that has channels C3-A2 and F3-A1. We assume the CSV had a \n# column called STAGES with the stages of each epoch.\neeg = EEG(edf_file, staging.STAGES)\n\n# We extract the TimeSeries object corresponding to C3-A2\nsignal = eeg.signals[\"C3-A2\"]\n\n# Detect the NREM periods\nnrems = nrem(eeg)\n\n# Split the C3 signal into 30-second windows (not-overlapping).\nepochs = segment(signal, signal.fs * 30)\n\n# PSD function to be used within each window in the spectrograms\npsd = x -> PSD(x, signal.fs, signal.fs * 5)\n\nmean_delta_powers = []\nfor nrem_period in nrems\n    # Extract the portion of the signal corresponding to this NREM period\n    # This is a vector of vectors [vector_1, ..., vector_k], with the ith \n    # vector being the ith epoch in this NREM period.\n    nrem_epochs = epochs[nrem_period]\n\n    # Simply to make things conceptually simpler, we convert the NREM period into a TimeSeries\n    nrem_signal = TimeSeries(vcat(nrem_epochs...), signal.fs, 30)\n    \n    # Compute spectrogram with 30sec windows using `psd` on each window.\n    spec = Spectrogram(nrem_signal, nrem_signal.fs*30, psd)\n\n    # Compute mean power in delta band (0.5 to 3.9 Hz) from the spectrogram.\n    δ = mean_band_power(spec, 0.5, 3.9)\n    # Store the result in the mean_delta_powers list.\n    push!(mean_delta_powers, δ)\nend\n\n# Now the ith element in `mean_delta_powers` is the mean delta power \n# of the ith NREM period.","category":"page"},{"location":"#Power-spectrum-examples","page":"Home","title":"Power spectrum examples","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"\nS = Spectrogram(signal, eeg.fs, 3, 0.5) # Compute spectrogram with 3 second segments and 0.5 segment overlap.\np = plot_spectrogram(S, 30.0, 2) # Plot the spectrogram with limit frequency 30.0; type 2 plot = surface plot.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Image)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Alternatively, ","category":"page"},{"location":"","page":"Home","title":"Home","text":"p = plot_spectrogram(S, 30.0, 1, :inferno) # Color scheme inferno is better for heatmap","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Image) ","category":"page"}]
}
