import PopupMenu from "../popup-menu/component.jsx";


const SettingsPopup = ({visible, onClose}) => {
    return (
        <PopupMenu
            visible={visible}
            title={`SETTINGS.exe`}
            onClose={onClose}
        >
        </PopupMenu>
    );
}

export default SettingsPopup;