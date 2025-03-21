import React from 'react';

export function HangmanDrawing({ stage }) {
    return (
        <svg width="100" height="100" viewBox='0 0 100 250'>

            {/* At GROUND */}
            {["ground","stand","rope", "hair", "head", "body", 
            "left arm", "right arm", "left leg", "right leg"].includes(stage) 
            && <line x1={20} y1={240} x2={120} y2={240} stroke='#964B00' strokeWidth={5} />}


            {/* At  STAND*/}
            {["stand","rope", "hair", "head", "body", 
            "left arm", "right arm", "left leg", "right leg"].includes(stage) &&
                <g>
                    <line x1={70} y1={240} x2={70} y2={40} stroke='#964B00' strokeWidth={5} />
                    <line x1={70} y1={50} x2={140} y2={50} stroke='#964B00' strokeWidth={5} />
                </g>}

            {/* At rope */}
            {["rope", "hair", "head", "body", 
            "left arm", "right arm", "left leg", "right leg"].includes(stage)
                && (<line x1={140} y1={50} x2={140} y2={80} stroke='brown' strokeWidth={5} />)}

            {/* At hair */}
            {["hair", "head", "body", "left arm", 
            "right arm", "left leg", "right leg"].includes(stage) &&
                (<circle cx={140} cy={100} r={20} stroke='red' strokeWidth={5} fill='none' />)}

            {/* At HEAD */}
            {["head", "body", "left arm", "right arm", "left leg", "right leg"].includes(stage) &&
                (<circle cx={140} cy={100} r={20} stroke='red' strokeWidth={5} fill='pink' />)}

            {/* At BODY */}
            {["body", "left arm", "right arm", "left leg", "right leg"].includes(stage) &&
                (<line x1={140} y1={120} x2={140} y2={180} stroke='red' strokeWidth={5} />)}

            {/* At LEFT ARM */}
            {["left arm", "right arm", "left leg", "right leg"].includes(stage) &&
                (<line x1={120} y1={140} x2={140} y2={160} stroke='red' strokeWidth={5} />)}

            {/* At RIGHT ARM */}
            {["right arm", "left leg", "right leg"].includes(stage) &&
                (<line x1={160} y1={140} x2={140} y2={160} stroke='red' strokeWidth={5} />)}

            {/* At LEFT LEG */}
            {["left leg", "right leg"].includes(stage) &&
                (<line x1={120} y1={220} x2={140} y2={180} stroke='red' strokeWidth={5} />)}

            {/* At RIGHT LEG */}
            {["right leg"].includes(stage) &&
                (<line x1={160} y1={220} x2={140} y2={180} stroke='red' strokeWidth={5} />)}
        </svg>
    );
}
