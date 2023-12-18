import React, { useEffect, useState } from 'react';
import { getUserInformation } from '../../apis/Client/UserApi';

export default function ReviewOnePerson({ e }) {
    const userId = e.client.userId;
    const token = window.localStorage.getItem('access_token');
    const [staticImage, setStaticImage] = useState();

    useEffect(() => {
        getUserInformation(userId, token)
            .then(res => setStaticImage(res.data.body.file));
    }, [userId, token]);

    const renderStars = (numStars) => {
        const totalStars = 5;
        const stars = [];
        for (let i = 0; i < totalStars; i++) {
            if (i < numStars) {
                stars.push(
                    <svg key={i} className="w-6 h-6 text-yellow-300" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        {/* Your star SVG path for yellow stars */}
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-6 block h-6 text-gray-300" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        {/* Your star SVG path for gray stars */}
                        <path
                            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <div className="grid gap-y-5 w-full bg-gray-100 rounded-lg p-6">
            <div className="flex items-center">
                <img src={`data:image/*;base64,${staticImage}`} className='w-24 h-24 rounded-full mr-5' alt="Testimonio 1" />
                <h5 className="text-xl font-medium">{e.client.name} {e.client.lastname}</h5>
            </div>
            <div className="flex items-center space-x-3 mb-5">
                {renderStars(e.numberStars)}
            </div>
            <h5 className="text-lg font-medium">{e.title}</h5>
            <p className="text-gray-400">{e.comment}</p>
        </div>
    );
}
