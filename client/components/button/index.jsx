var React = require( 'react' ),
	classnames = require( 'classnames' ),
	A11yMixin = require( '../../lib/a11y-mixin' );

var style = require( './style.scss' );

function getClass(name) {
	return style[name];
}

let Button = React.createClass( {
	mixins: [A11yMixin],
	propTypes: {
		size: React.PropTypes.oneOf( ['small', 'normal', 'large', 'hero'] ),
		color: React.PropTypes.oneOf( ['gray', 'blue', 'green'] ),
		// theme: React.PropTypes.oneOf( ['wp', 'jetpack'] ),
		primary: React.PropTypes.any,
		dangerous: React.PropTypes.any,
		destructive: React.PropTypes.any,
		onClick: React.PropTypes.func,
		disabled: React.PropTypes.any,
		href: React.PropTypes.string,
		style: React.PropTypes.object
	},

	getDefaultProps: function() {
		return { size: 'normal', inline: true, color: 'gray', theme: 'wp', disabled: false };
	},

	handleClick: function( e ) {
		e.preventDefault();

		if ( this.props.href && !this.props.onClick ) {
			window.location = this.props.href;
		} else if ( this.props.onClick ) {
			this.props.onClick( e );
		}
	},

	render: function() {
		var { size, color, onClick, href, primary, dangerous, destructive, ...other } = this.props;

		var buttonClasses = {};

		buttonClasses[getClass('button')] = true;
		// buttonClasses[getClass('is-link')] = !!href;
		buttonClasses[getClass('is-primary')] = primary;
		buttonClasses[getClass(`button-${color}`)] = (color !== 'gray');
		buttonClasses[getClass(`button-${size}`)] = (size !== 'normal');

		var className = classnames(buttonClasses);

		// we need to make sure this is null if it is unlikely to take action, 
		// as in those cases we want the default behaviour - submitting a form!
		var clickHandler = ( this.props.href || this.props.onClick ) ? this.handleClick : null;

		return (
			<button {...other} role="button" onKeyDown={this.handleKeyDown.bind(this, clickHandler)} className={className} style={this.props.style} onClick={clickHandler}>
				{this.props.children}
			</button>
		);
	}
} );

module.exports = Button;
