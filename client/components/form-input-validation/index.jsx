/**
 * External dependencies
 */
var React = require( 'react' ),
	classNames = require( 'classnames' );

require( './style.scss' );

module.exports = React.createClass( {

	displayName: 'FormInputValidation',

	getDefaultProps: function() {
		return { isError: false };
	},

	render: function() {
		var classes = classNames( {
			'form-input-validation': true,
			'is-error': this.props.isError
		} );

		return (
			<div className={ classes }>
				<span>{ this.props.text }</span>
			</div>
		);
	}
} );
