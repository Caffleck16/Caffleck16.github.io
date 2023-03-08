import SidebarInfo from './SidebarInfo';
const Sidebar = ({side , handleNew, notes}) => {
    if (side === 1) {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Notes</h2>
                    <button onClick= {() => handleNew()}>+</button>
                </div>
                    <div className="sidebar-info">
                        <SidebarInfo notes = { notes }/>
                    </div>
            </div>
         );
    }
    else {
        return (
            <div>
            </div>
        )
    }
}
 
export default Sidebar;
