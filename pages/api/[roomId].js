import { useSocket } from "@/context/socket"
import { useEffect } from "react"
import usePeer from "@/hooks/usePeer"
import useMediaStream from "@/hooks/useMediaStream"
import Player from "@/component/Player"

const Room = () => {
    const socket = useSocket();
    const { peer, myId } = usePeer();
    const { stream } = useMediaStream();

    useEffect(() => {
        if (!socket) return;
        const handleUserConnected = () => {
            console.log(`user connected in room with userId ${newUser}`)
        }
        socket.on('user connected', handleUserConnected)

        return () => {
            socket.off('user connected', handleUserConnected)
        }
    }, [socket])

    return (
        <div>
            <Player url={stream} muted playing playerId={myId} />

        </div>
    )
}
export default Room;