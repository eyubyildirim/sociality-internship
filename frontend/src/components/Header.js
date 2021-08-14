import PropTypes from "prop-types";

const Header = (props) => {
    return <div>
        <h1>{props.title}</h1>
    </div>
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header