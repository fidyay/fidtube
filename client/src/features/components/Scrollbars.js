import Scrollbars from 'react-custom-scrollbars'

function CustomScrollbars (props) {

      return (
        <Scrollbars
        {...props}
         autoHide autoHideDuration={200}  autoHideTimeout={200}
         renderThumbVertical={() => <div className="thumb"/>}
         >
          {props.children}
        </Scrollbars>
      );
}

export default CustomScrollbars
  