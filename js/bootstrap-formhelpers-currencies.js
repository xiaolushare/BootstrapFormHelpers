/* ==========================================================
 * bootstrap-formhelpers-currencies.js
 * https://github.com/vlamanna/BootstrapFormHelpers
 * ==========================================================
 * Copyright 2013 Vincent Lamanna
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */
 
!function ($) {

  'use strict';


  /* COUNTRIES CLASS DEFINITION
   * ====================== */

  var BFHCurrencies = function (element, options) {
    var currency;
    
    this.options = $.extend({}, $.fn.bfhcurrencies.defaults, options);
    this.$element = $(element);

    if (this.options.currencylist) {
      this.currencyList = [];
      this.options.currencylist = this.options.currencylist.split(',');
      for (currency in BFHCurrenciesList) {
        if (BFHCurrenciesList.hasOwnProperty(currency)) {
          if ($.inArray(currency, this.options.currencylist) >= 0) {
            this.currencyList[currency] = BFHCurrenciesList[currency];
          }
        }
      }
    } else {
      this.currencyList = BFHCurrenciesList;
    }

    if (this.$element.is('select')) {
      this.addCurrencies();
    }

    if (this.$element.is('span')) {
      this.displayCurrency();
    }

    if (this.$element.hasClass('bfh-selectbox')) {
      this.addBootstrapCurrencies();
    }
  };

  BFHCurrencies.prototype = {

    constructor: BFHCurrencies,

    addCurrencies: function () {
      var value,
          currency;
          
      value = this.options.currency;

      this.$element.html('');
      this.$element.append('<option value=""></option>');
      for (currency in this.currencyList) {
        if (this.currencyList.hasOwnProperty(currency)) {
          this.$element.append('<option value="' + currency + '">' + this.currencyList[currency].label + '</option>');
        }
      }

      this.$element.val(value);
    },


    addBootstrapCurrencies: function() {
      var $input,
          $toggle,
          $options,
          value,
          currency;

      value = this.options.currency;
      $input = this.$element.find('input[type="hidden"]');
      $toggle = this.$element.find('.bfh-selectbox-option');
      $options = this.$element.find('[role=option]');

      $options.html('');
      $options.append('<li><a tabindex="-1" href="#" data-option=""></a></li>');
      for (currency in this.currencyList) {
        if (this.currencyList.hasOwnProperty(currency)) {
          if (this.currencyList[currency].currencyflag) {
            this.flag = this.currencyList[currency].currencyflag;
          } else {
            this.flag = currency.substr(0,2);
          }
          if (this.options.flags === true) {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + currency +  '"><i class="glyphicon bfh-flag-' + this.flag + '"></i>' + this.currencyList[currency].label + '</a></li>');
          } else {
            $options.append('<li><a tabindex="-1" href="#" data-option="' + currency + '">' + this.currencyList[currency].label + '</a></li>');
          }
        }
      }

      $toggle.data('option', value);

      if (value) {
        if (this.options.flags === true) {
          if (this.currencyList[value].currencyflag) {
            this.flag = this.currencyList[value].currencyflag;
          } else {
            this.flag = value.substr(0,2);
          }
          $toggle.html('<i class="glyphicon bfh-flag-' + this.flag + '"></i> ' + this.currencyList[value].label);
        } else {
          $toggle.html(this.currencyList[value].label);
        }
      }

      $input.val(value);
    },

    displayCurrency: function () {
      var value;
      
      value = this.options.currency;

      if (this.currencyList[value].currencyflag) {
        this.flag = this.currencyList[value].currencyflag;
      } else {
        this.flag = value.substr(0,2);
      }
      if (this.options.flags === true) {
        this.$element.html('<i class="glyphicon bfh-flag-' + this.flag + '"></i>' + this.currencyList[value].label);
      } else {
        this.$element.html(this.currencyList[value].label);
      }
    }

  };


  /* CURRENCY PLUGIN DEFINITION
   * ======================= */

  $.fn.bfhcurrencies = function (option) {
    return this.each(function () {
      var $this,
          data,
          options;
          
      $this = $(this);
      data = $this.data('bfhcurrencies');
      options = typeof option === 'object' && option;

      if (!data) {
        $this.data('bfhcurrencies', (data = new BFHCurrencies(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  };

  $.fn.bfhcurrencies.Constructor = BFHCurrencies;

  $.fn.bfhcurrencies.defaults = {
    currency: '',
    currencyList: '',
    flags: false
  };


  /* CURRENCY DATA-API
   * ============== */

  $(window).on('load', function () {
    $('form select.bfh-currencies, span.bfh-currencies, div.bfh-currencies').each(function () {
      var $currencies;
      
      $currencies = $(this);

      $currencies.bfhcurrencies($currencies.data());
    });
  });


}(window.jQuery);
