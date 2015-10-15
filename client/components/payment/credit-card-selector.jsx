require( './credit-card-selector.scss' );

/**
 * External dependencies
 */
var React = require( 'react' ),
	where = require( 'lodash/collection/where' ),
	classNames = require( 'classnames' );

/**
 * Internal dependencies
 */
var StoredCard = require( './stored-card' ),
	NewCardForm = require( './new-card-form' ),
	storeTransactions = require( 'lib/store-transactions' );
	// upgradesActions = require( 'lib/upgrades/actions' );

var CreditCardSelector = React.createClass( {
	propTypes: {
		onSelectPayment: React.PropTypes.func.isRequired,
		account: React.PropTypes.object,
		cards: React.PropTypes.any,
		subscription: React.PropTypes.object
	},

	getInitialState: function() {
		if ( this.props.initialCard ) {
			return { section: this.props.initialCard.stored_details_id };
		}
		return { section: 'new-card' };
	},

	render: function() {
		return (
			<div className="payment-box-sections">
				{ this.storedCards() }
				{ this.newCardForm() }
			</div>
		);
	},

	storedCards: function() {
		return this.props.cards.get().map( function( card ) {
			var storedCard = <StoredCard card={ card } />;
			return this.section( card.stored_details_id, storedCard );
		}, this );
	},

	newCardForm: function() {
		var cardForm = (
			<NewCardForm
				ref="newCardForm"
				hasStoredCards={ this.props.cards.get().length > 0 }>
				{this.props.children}
			</NewCardForm>
		);

		return this.section( 'new-card', cardForm );
	},

	section: function( name, content ) {
		var classes = classNames( 'payment-box-section', {
			'selected': this.state.section === name,
			'no-stored-cards' : name === 'new-card' && this.props.cards.get().length === 0
		} );

		return (
			<div className={ classes }
					onClick={ this.handleClickedSection.bind( this, name ) }
					key={ name }>
				<div className="payment-box-section-inner">
					{ content }
				</div>
			</div>
		);
	},

	// Public API
	// returns false if no valid card selected
	getCardRef: function() {
		var cardRef;
		
		if ( 'new-card' === this.state.section ) {
			// get the form field values and check they're valid
			var newCardValues = this.refs.newCardForm.getValidFormFields();
			if ( newCardValues === false ) {
				return false;
			}

			cardRef = newCardValues;
		} else {
			cardRef = this.getStoredCardDetails( this.state.section );
		}

		return cardRef;
	},

	handleClickedSection: function( section ) {
		if ( section === this.state.section ) {
			return;
		}

		this.setState( { section: section } );
	},

	getStoredCardDetails: function( section ) {
		var cards = this.props.cards.get();
		return where( cards, { stored_details_id: section } )[ 0 ];
	}

} );

module.exports = CreditCardSelector;