module EEGToolkit

export TimeSeries
export gen_time_domain 
export segment

export EEG
export epoch 
export filter_by_stage
export artifact_reject

export AmplitudeSpectrum 
export PSD 
export Spectrogram
export plot_spectrogram 
export plot_psd
export next_power_of_two 
export zero_pad 
export freq_band 
export mean_band_power 

export nrem

export sigma_index
export relative_spindle_power


include("eeg.jl")
include("nrem.jl")
include("psd.jl")
include("spindles.jl")

end