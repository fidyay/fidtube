import  Slider  from './Slider.js'
import { useRef, useState, useEffect } from 'react'
const secondsToHumanReableTime = s => {
    if (s === 0) return '00:00'
    let minutes = Math.floor(s/60)
    let lastSeconds = Math.floor(s-minutes*60)
    if (minutes >= 60) {
        let hours = Math.floor(minutes/60)
        let lastMinutes = Math.floor(minutes-hours*60)
        if (String(hours).length < 2) {
            hours = `0${hours}`
        }
        if (String(lastMinutes).length < 2) {
            lastMinutes = `0${lastMinutes}`
        }
        if (String(lastSeconds).length < 2) {
            lastSeconds = `0${lastSeconds}`
        }
        return `${hours}:${lastMinutes}:${lastSeconds}`
    }
    if (String(minutes).length < 2) {
        minutes = `0${minutes}`
    }
    if (String(lastSeconds).length < 2) {
        lastSeconds = `0${lastSeconds}`
    }
    return `${minutes}:${lastSeconds}`
} 



const VideoPlayer = ({src}) => {
    const videoSrc = src
    const video = useRef(null)
    const videoPlayer = useRef(null)
    const [sliderUsing, setSliderUsing] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [videoPlaying, setVideoPlaying] = useState(false)
    const [videoMuted, setVideoMuted] = useState(false)
    const [volume, setVolume] = useState(50)
    const [paused, setPausePressed] = useState(true)
    const [fullScreen, setFullScreen] = useState(false)
    const [screenLocked, setScreenLocked] = useState(false)
    const [buffered, setBuffered] = useState(0)

    if (video.current) {
        (videoPlaying && !paused) ? video.current.play() : video.current.pause()  
    }
  
    useEffect(() => {
        const handleFullscreenChange = () => {
            setFullScreen(!fullScreen)
            if (window.screen.orientation.type.includes('portrait')) {
                !screenLocked ? 
                window.screen.orientation.lock('landscape') : 
                window.screen.orientation.unlock ? window.screen.orientation.unlock() : console.log('unlock is not supported')
                setScreenLocked(!screenLocked)
            }
        }
    
        document.onfullscreenchange = handleFullscreenChange
        return () => {
            document.onfullscreenchange = null
        }
    }, [fullScreen, screenLocked])

    let timeout = useRef(null)
    useEffect(() => {
        timeout.current = setTimeout(() => {
            if (!sliderUsing) {
                if (videoPlaying) {
                    setShowControls(false)
                }
            } 
        }, 3000)

        return () => {
            clearTimeout(timeout.current)
        }
    }, [showControls, videoPlaying, videoMuted, volume, fullScreen, sliderUsing])

    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    const requestFullscreen = () => {
        videoPlayer.current.requestFullscreen({navigationUI: 'hide'})
    }

    const exitFullscreen = () => {
        document.exitFullscreen()
    }

    return (
        <div onPointerOver={() => {
            setShowControls(true)
            const visualiseControls = () => { 
                setShowControls(true)           
            }
            const unsetEventListener = () => {
                window.removeEventListener('pointermove', visualiseControls)
                videoPlayer.current.removeEventListener('pointerout', unsetEventListener)
            }
            window.addEventListener('pointermove', visualiseControls)
            videoPlayer.current.addEventListener('pointerout', unsetEventListener)
        }}
        ref={videoPlayer} className={'video__videoplayer'}>
            <video onProgress={e => {
                const vid = e.target
                if (duration > 0) {
                    for (let i = 0; i < vid.buffered.length; i++) {
                        if (vid.buffered.start(vid.buffered.length - 1 - i) < vid.currentTime) {
                            setBuffered(vid.buffered.end(vid.buffered.length - 1 - i))
                            break
                        }
                   
                }
                }
            }}
            src={`/videofile/${videoSrc}`} preload="metadata" onDurationChange={e => {
                    setDuration(e.target.duration)
                }}
            onTimeUpdate={() => setProgress(video.current.currentTime)} loop={false} className={'video__videoplayer__file'} ref={video}
                
            />
            <div style={{opacity: showControls ? 1 : 0, cursor: !fullScreen ? 'pointer' : showControls ? 'pointer' : 'none'}}
            onClick={(e) => { 
                    if (e.target.className !== 'video__videoplayer__controls') return
                    setShowControls(true)
                }}
            className="video__videoplayer__controls">
                <div className="video__videoplayer__controls__progress">
                    <div className="video__videoplayer__controls__progress__currentTime">{video.current && secondsToHumanReableTime(progress)}</div>
                    <Slider 
                        videoProgress
                        videoPlaying={videoPlaying}
                        buffered={buffered}
                        className="video__videoplayer__controls__progress__slider"
                        max={video.current ? duration : 0}
                        tipFormatter={secondsToHumanReableTime}
                        setVideoPlaying={setVideoPlaying}
                        value={progress}
                        video={video.current}
                        paused={paused}
                        setSliderUsing={setSliderUsing}
                        onChange={value => {
                            setProgress(value)
                            video.current.currentTime = value

                        }
                    }
                    />
                    <div className="video__videoplayer__controls__progress__duration">{video.current && secondsToHumanReableTime(duration)}</div>
                </div>
                <div className="video__videoplayer__controls__other">
                    <div className="video__videoplayer__controls__other__wrapper">
                    <button className={`video__videoplayer__controls__other__${videoPlaying ? 'pause' : 'play'}`}
                        onClick={() => { 
                            setShowControls(true)
                            setVideoPlaying(!videoPlaying)
                            setPausePressed(!paused)
                        }}
                    />
                    <button className={`video__videoplayer__controls__other__${videoMuted ? 'volume-off' : 'volume'}`} 
                        onClick={ () => {
                            if (videoMuted) {
                                video.current.muted = false
                                setVideoMuted(!videoMuted)

                            }
                            if(!videoMuted) {
                                video.current.muted = true
                                setVideoMuted(!videoMuted)

                            }
                            
                        }
                        }
                    />
                    <Slider setVideoPlaying={setVideoPlaying} volume className="video__videoplayer__controls__other__volumeSlider" value={volume} disabled={videoMuted}
                        videoPlaying={videoPlaying}
                        video={video.current}
                        paused={paused}
                        setSliderUsing={setSliderUsing}
                        onChange={value => {
                            setVolume(value)                          
                            video.current.volume = value/100

                        }
                        }
                    />
                    </div>
                    
                    <button className={`video__videoplayer__controls__other__${fullScreen ? 'fullscreen-exit' : 'fullscreen'}`}
                        onClick={() => {
                            fullScreen ? exitFullscreen() : requestFullscreen() 
                        }
                        }
                    />
                </div>                
            </div>
        </div>
    )
}

export default VideoPlayer