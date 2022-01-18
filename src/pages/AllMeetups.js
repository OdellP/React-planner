import { useState, useEffect } from 'react';
import MeetupList from "../components/meetups/MeetupList";

function AllMeetupsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetUps, setLoadedMeetups] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        fetch(
            'https://react-planner-backend-default-rtdb.firebaseio.com/meetups.json'
            ).then(respone => {
                return respone.json();
            }).then(data => {
                const meetups = [];

                for (const key in data) {
                    const meetup = {
                        id: key,
                        ...data[key]
                    };

                    meetups.push(meetup);
                }

                setIsLoading(false);
                setLoadedMeetups(meetups);
            })
    
            if (isLoading) {
                return (
                    <section>
                        <p>Loading...</p>
                    </section>
              );
            }
    }, [isLoading]);

    return <section>
        <h1>All Meetups</h1>
        <MeetupList meetups={loadedMeetUps} />
    </section>;
}

export default AllMeetupsPage;