
export default function InputField(props) {

    return (
        <div className="flex flex-col items-center w-full">

            {props.Token ? (

                <input
                    placeholder='Enter Room ID'
                    value={props.roomId}
                    onChange={e => props.setRoomId(e.target.value)}
                    className=" text-black text-lg p-1 rounded w-9/12 mb-3 border border-gray-500"
                />

            ) : (

                <div>
                    <p>Please log in to continue</p>

                </div>
            )}
        </div>
    )
}