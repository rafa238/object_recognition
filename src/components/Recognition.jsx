import React, { useEffect, useRef } from 'react'
import * as ml5 from "ml5";
import Webcam from 'react-webcam';
import Swal from 'sweetalert2';

const dimensions = { width: 800, height: 500 };

export const Recognition = () => {
    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        let detectionInterval = null;
        let ctx;
        
        const modelLoaded = () => {
            const { width, height } = dimensions;

            videoRef.current.video.width = width;
            videoRef.current.video.height = height;
            /* Box */
            ctx = canvasRef.current.getContext('2d');
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            detectionInterval = setInterval(() => {
                detect();
            }, 1000);
        };

        const objectDetector = ml5.objectDetector('cocossd', modelLoaded);

        const detect = () => {
            if (videoRef.current.video.readyState !== 4) {
                console.warn('Video no disponible');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Al parecer hubo un error conectando tu camara :("
                });
                return;
            }

            objectDetector.detect(videoRef.current.video, (err, results) => {
                console.log(results);
                const { width, height } = dimensions;
                ctx.clearRect(0, 0, width, height);
                if (results && results.length) {
                    results.forEach((detection) => {
                        ctx.beginPath();
                        ctx.fillStyle = "#FF0000";
                        const { label, x, y, width, height } = detection;
                        ctx.fillText(label, x, y - 5);
                        ctx.rect(x +6, y+6, width, height);
                        ctx.stroke();
                    });
                }
            });
        };


        return () => {
            console.log("componenete desmontado")
            if(detectionInterval != null){
                clearInterval(detectionInterval);
            }
        }

    }, []);
    return (
        <div className="App">
            <Webcam ref={videoRef} className="webcam mt-4"/>
            <canvas ref={canvasRef} className="canvas mt-4" />
        </div>
    )
}