import Scrollbars from "./Scrollbars";

const WrapperWithScrollbar = props => {
    return (
        <div className="wrapper">
        <Scrollbars>
        {props.children}
        </Scrollbars>
   
   </div>    
    )
}

export default WrapperWithScrollbar