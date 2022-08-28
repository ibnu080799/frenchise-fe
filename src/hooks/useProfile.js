import { useEffect, useState } from 'react';

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    let currProfile = null;
    try {
        currProfile = JSON.parse(localStorage.getItem('users'));
    } catch (error) {
        console.log('@InvalidProfile');
    }
    useEffect(() => {
        if (!currProfile) {
            const setBearerToLocal = async () => {
                if (profile != null) {
                    const resProfile = await localStorage.setItem('users', profile);
                    setProfile(resProfile);
                }
            };
            setBearerToLocal();
        }
    });

    return [currProfile, setProfile];
};

export default useProfile;
