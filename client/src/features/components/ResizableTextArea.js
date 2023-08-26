import Scrollbars from "./Scrollbars.js"
import { useState } from "react"
const ResizableTextarea = (props) => {
	const [height, setHeight] = useState(60)
	const divHeight = height <= 60 ? 60 : height >= 130 ? 130 : height

	return (
		<div className="textarea-wrapper" style={{height: divHeight}}>
			<Scrollbars>
				<textarea placeholder={props.placeholder} className="textarea" value={props.value} onChange={(e) => {
					e.target.style.height = 'auto'
					e.target.style.height = `${e.target.scrollHeight}px`
					setHeight(e.target.scrollHeight)
					props.onChange(e)
				}}/>
			</Scrollbars>
		</div>
	)
}

export default ResizableTextarea