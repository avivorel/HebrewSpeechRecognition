import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
    const [isListening, setIsListening] = useState(false);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        if (transcript.includes('לחזור')) {
            // Add your logic to highlight or indicate the word "לחזור" in the transcript
            console.log('Word "לחזור" detected!');
        }
    }, [transcript]);

    const startListening = () => {
        setIsListening(true);
        SpeechRecognition.startListening({ continuous: true });
    };

    const stopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
    };

    const checkWordRecognition = () => {
        if (transcript.includes('לחזור')) {
            console.log('Word "לחזור" detected!');
        }
    };

    const handleSpeechRecognitionEnd = () => {
        setIsListening(false);
        checkWordRecognition();
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Audio Recognition</h1>
            <div style={styles.microphoneStatus}>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
            </div>
            <div style={styles.controls}>
                <button onClick={startListening} disabled={listening} style={styles.button}>
                    Start
                </button>
                <button onClick={stopListening} disabled={!listening} style={styles.button}>
                    Stop
                </button>
                <button onClick={resetTranscript} style={styles.button}>
                    Reset
                </button>
            </div>
            <div style={styles.transcript}>
                {transcript.split(' ').map((word, index) => (
                    <span key={index} style={{ background: word === 'לחזור' ? 'yellow' : 'transparent' }}>
            {word}{' '}
          </span>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2rem',
    },
    heading: {
        marginBottom: '1rem',
    },
    microphoneStatus: {
        marginBottom: '1rem',
    },
    controls: {
        marginBottom: '1rem',
    },
    button: {
        marginRight: '1rem',
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#4285F4',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        outline: 'none',
    },
    transcript: {
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        borderRadius: '4px',
        minHeight: '100px',
        overflow: 'auto',
        width: '400px',
    },
};
export default App;
