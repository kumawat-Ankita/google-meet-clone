
export default function InputField(props) {

    return (
        <div>

            {props.Token ? (

                <input
                    placeholder='Enter Room ID'
                    value={props.roomId}
                    onChange={e => setRoomId(e.target.value)}
                />

            ) : (

                <div>
                    <p>Please log in to continue</p>

                </div>
            )}
        </div>
    )
}