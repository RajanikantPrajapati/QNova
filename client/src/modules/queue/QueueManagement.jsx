import { useEffect, useState } from "react";
import { getQueueByService } from "../../services/queueApi";

function QueueManagement({ provider, service }) {
    const [queue, setQueue] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadQueue() {
            try {
                setLoading(true);
                setError("");

                const data = await getQueueByService(service.id);

                setQueue(data);
            } catch (error) {
                setError(error.message);
                setQueue(null);
            } finally {
                setLoading(false);
            }
        }

        loadQueue();
    }, [service.id]);

    if (loading) {
        return (
            <section>
                <h2>Step 4: Queue Management</h2>
                <p>Loading queue...</p>
            </section>
        );
    }

    return (
        <section>
            <h2>Step 4: Queue Management</h2>

            <p>
                <strong>Business:</strong> {provider.name}
            </p>

            <p>
                <strong>Service:</strong> {service.name}
            </p>

            <hr />

            {error && <p>{error}</p>}

            {queue && (
                <>
                    <h3>Queue Information</h3>

                    <p>
                        <strong>Queue ID:</strong> {queue.id}
                    </p>

                    <p>
                        <strong>Queue Status:</strong> {queue.status}
                    </p>

                    <p>
                        <strong>Waiting Customers:</strong> 0
                    </p>

                    <p>
                        <strong>Now Serving:</strong> -
                    </p>

                    <p>
                        <strong>Next Token:</strong> -
                    </p>
                </>
            )}

            {!queue && !error && (
                <p>No queue available.</p>
            )}
        </section>
    );
}

export default QueueManagement;