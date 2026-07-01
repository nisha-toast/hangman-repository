import React from 'react';

export function HangmanDrawing({ stage }) {
    return (
        <svg 
            viewBox="0 0 200 250" 
            style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: '100%', 
                display: 'block', 
                margin: '0 auto' 
            }}
        >

            {/* At GROUND */}
            {["ground","stand","rope", "hair", "head", "body", 
            "left arm", "right arm", "left leg", "right leg"].includes(stage) 
            && <line x1={20} y1={240} x2={120} y2={240} stroke='#964B00' strokeWidth={6} strokeLinecap="round" />}


            {/* At  STAND*/}
            {["stand","rope", "hair", "head", "body", 
            "left arm", "right arm", "left leg", "right leg"].includes(stage) &&
                <g>
                    <line x1={70} y1={240} x2={70} y2={40} stroke='#964B00' strokeWidth={6} strokeLinecap="round" />
                    <line x1={70} y1={50} x2={140} y2={50} stroke='#964B00' strokeWidth={6} strokeLinecap="round" />
                </g>}

            {/* At rope */}
            {["rope", "hair", "head", "body", 
            "left arm", "right arm", "left leg", "right leg"].includes(stage)
                && (<line x1={140} y1={50} x2={140} y2={80} stroke='brown' strokeWidth={4} strokeLinecap="round" />)}

            {/* At hair */}
            {["hair", "head", "body", "left arm", 
            "right arm", "left leg", "right leg"].includes(stage) &&
                (<circle cx={140} cy={100} r={20} stroke='red' strokeWidth={5} fill='none' />)}

            {/* At HEAD */}
            {["head", "body", "left arm", "right arm", "left leg", "right leg"].includes(stage) &&
                (<circle cx={140} cy={100} r={20} stroke='red' strokeWidth={5} fill='pink' />)}

            {/* At BODY */}
            {["body", "left arm", "right arm", "left leg", "right leg"].includes(stage) &&
                (<line x1={140} y1={120} x2={140} y2={180} stroke='red' strokeWidth={5} strokeLinecap="round" />)}

            {/* At LEFT ARM */}
            {["left arm", "right arm", "left leg", "right leg"].includes(stage) &&
                (<line x1={120} y1={140} x2={140} y2={160} stroke='red' strokeWidth={5} strokeLinecap="round" />)}

            {/* At RIGHT ARM */}
            {["right arm", "left leg", "right leg"].includes(stage) &&
                (<line x1={160} y1={140} x2={140} y2={160} stroke='red' strokeWidth={5} strokeLinecap="round" />)}

            {/* At LEFT LEG */}
            {["left leg", "right leg"].includes(stage) &&
                (<line x1={120} y1={220} x2={140} y2={180} stroke='red' strokeWidth={5} strokeLinecap="round" />)}

            {/* At RIGHT LEG */}
            {["right leg"].includes(stage) &&
                (<line x1={160} y1={220} x2={140} y2={180} stroke='red' strokeWidth={5} strokeLinecap="round" />)}
        </svg>
    );
}

