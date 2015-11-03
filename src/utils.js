/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

/**
 * A utilities library.
 *
 * @class utils
 * @singleton
 */

CKEDITOR.define( [ 'utils-lodash', 'lib/lodash/lodash-ckeditor' ], function( lodashIncludes, lodash ) {
	var utils = {
		/**
		 * Creates a spy function (ala Sinon.js) that can be used to inspect call to it.
		 *
		 * The following are the present features:
		 *
		 *  * spy.called: property set to `true` if the function has been called at least once.
		 *
		 * @returns {Function} The spy function.
		 */
		spy() {
			var spy = function() {
				spy.called = true;
			};

			return spy;
		},

		/**
		 * Returns a unique id. This id is a number (starting from 1) which will never get repeated on successive calls
		 * to this method.
		 *
		 * @returns {Number} A number representing the id.
		 */
		uid: ( function() {
			var next = 1;

			return function() {
				return next++;
			};
		} )(),

		/**
		 * Checks if value implements iterator interface.
		 *
		 * @param {Mixed} value The value to check.
		 * @returns {Boolean} True if value implements iterator interface.
		 */
		isIterable( value ) {
			return !!( value && value[ Symbol.iterator ] );
		},

		/**
		 * Compares how given arrays relate to each other. One array can be: same as another array, prefix of another array
		 * or completely different.
		 *
		 *   compareArrays( [ 0, 2 ], [ 0, 2 ] ); // SAME
		 *   compareArrays( [ 0, 2 ], [ 0 ] ); // PREFIX
		 *   compareArrays( [ 0, 2 ], [ 0, 2, 1 ] ); // DIFFERENT
		 *   compareArrays( [ 0, 2 ], [ 1, 3 ] ); // DIFFERENT
		 *
		 * @param {Array} a Array that is compared.
		 * @param {Array} b Array to compare with.
		 * @returns {Number} How array `a` is related to array `b`. Represented by one of flags:
		 * `a` is {@link utils.compareArrays#SAME same}, `a` is a {@link utils.compareArrays#PREFIX prefix}
		 * or `a` is {@link utils.compareArrays#DIFFERENT different}.
		 */
		compareArrays( a, b ) {
			var minLen = Math.min( a.length, b.length );

			for ( var i = 0; i < minLen; i++ ) {
				if ( a[ i ] != b[ i ] ) {
					// The arrays are different.
					return utils.compareArrays.DIFFERENT;
				}
			}

			// Both arrays were same at all points.
			if ( a.length == b.length ) {
				// If their length is also same, they are the same.
				return utils.compareArrays.SAME;
			} else if ( a.length < b.length ) {
				// Compared array is shorter so it is a prefix of the other array.
				return utils.compareArrays.PREFIX;
			}

			// In other case, the arrays are different.
			return utils.compareArrays.DIFFERENT;
		}
	};

	/**
	 * Flag for "is same as" relation between arrays.
	 *
	 * @type {number}
	 */
	utils.compareArrays.SAME = 0;
	/**
	 * Flag for "is a prefix of" relation between arrays.
	 *
	 * @type {number}
	 */
	utils.compareArrays.PREFIX = 1;
	/**
	 * Flag for "is different than" relation between arrays.
	 *
	 * @type {number}
	 */
	utils.compareArrays.DIFFERENT = 2;

	// Extend "utils" with Lo-Dash methods.
	for ( var i = 0; i < lodashIncludes.length; i++ ) {
		utils[ lodashIncludes[ i ] ] = lodash[ lodashIncludes[ i ] ];
	}

	return utils;
} );
