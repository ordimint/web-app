import React, { useState, useEffect } from 'react';

const AuctionCountdown = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft() {
        let now = new Date();
        let then = new Date();

        if (now.getHours() < 12) {
            then.setHours(12, 0, 0, 0);
        } else {
            then.setHours(24, 0, 0, 0);
        }

        let difference = then - now;

        let hoursLeft = Math.floor(difference / (1000 * 60 * 60));
        let minutesLeft = Math.floor((difference / (1000 * 60)) % 60);
        let secondsLeft = Math.floor((difference / 1000) % 60);

        return {
            hours: hoursLeft.toString().padStart(2, '0'),
            minutes: minutesLeft.toString().padStart(2, '0'),
            seconds: secondsLeft.toString().padStart(2, '0'),
        };
    }

    return (
        <div className='text-center'>
            <h5>Next price update for auctions in: {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</h5>
            <h6>
                Updates always at 12:00 and 24:00 (UTC)
            </h6>
        </div>
    );
};

export default AuctionCountdown;
