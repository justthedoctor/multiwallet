$(document).ready(function() {

	var host = $("#coinjs_broadcast option:selected").val();
	var coinUrl = new URL(window.location.href).searchParams.get('coin');
	var emailUrl = new URL(window.location.href).searchParams.get('email');
	var passwordUrl = new URL(window.location.href).searchParams.get('password');

 /* open wallet code */

	var explorer_tx = "https://coinb.in/tx/"
	var explorer_addr = "https://coinb.in/addr/"
	var explorer_block = "https://coinb.in/block/"
	var multiWalletApiDomain = 'api.cryptodepot.org'

	var wallet_timer = false;

	$("#openBtn").click(function() {
		var host = $("#coinjs_utxo option:selected").val();
		var email = $("#openEmail").val().toLowerCase();
		if(email.match(/[\s\w\d]+@[\s\w\d]+/g)) {
			if($("#openPass").val().length>=10) {
				if($("#openPass").val()==$("#openPassConfirm").val()) {
					var email = $("#openEmail").val().toLowerCase();
					var pass = $("#openPass").val();
					var s = email;
					s += '|'+pass+'|';
					s += s.length+'|!@'+((pass.length*7)+email.length)*7;
					var regchars = (pass.match(/[a-z]+/g)) ? pass.match(/[a-z]+/g).length : 1;
					var regupchars = (pass.match(/[A-Z]+/g)) ? pass.match(/[A-Z]+/g).length : 1;
					var regnums = (pass.match(/[0-9]+/g)) ? pass.match(/[0-9]+/g).length : 1;
					s += ((regnums+regchars)+regupchars)*pass.length+'3571';
					s += (s+''+s);

					for(i=0;i<=50;i++) {
						s = Crypto.SHA256(s);
					}

					coinjs.compressed = true;
					var keys = coinjs.newKeys(s);
					var address = keys.address;
					var wif = keys.wif;
					var pubkey = keys.pubkey;
					var privkeyaes = CryptoJS.AES.encrypt(keys.wif, pass);

					$("#walletKeys .walletSegWitRS").addClass("hidden");
					if($("#walletSegwit").is(":checked")) {
						if($("#walletSegwitBech32").is(":checked")) {
							var sw = coinjs.bech32Address(pubkey);
							address = sw.address;
						} else {

							var sw = coinjs.segwitAddress(pubkey);
							address = sw.address;
						}

						$("#walletKeys .walletSegWitRS").removeClass("hidden");
						$("#walletKeys .walletSegWitRS input:text").val(sw.redeemscript);
					}

					$("#walletAddress").html(address);
					// History Area
					if(host=="pandacoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/pnd/address.dws?'+address);}
					if(host=="komodo_mainnet") {$("#walletHistory").attr('href','https://kmdexplorer.io/address/'+address);}
					else if(host=="htmlcoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/html/address.dws?'+address);}
					else if(host=="dimecoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/dime/address.dws?'+address);}
					else if(host=="peercoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/ppc/address.dws?'+address);}
					else if(host=="mintcoin_mainnet") {$("#walletHistory").attr('href',''+address);}
					else if(host=='1x2coin_mainnet') {$("#walletHistory").attr('href',''+address);}
					else if(host=='2x2_mainnet') {$("#walletHistory").attr('href','http://2x2block.space/address/'+address);}
					else if(host=='2give_mainnet') {$("#walletHistory").attr('href',''+address);}
					else if(host=='404_mainnet') {$("#walletHistory").attr('href','http://404block.net/address/'+address);}
					else if(host=="42coin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/42/address.dws?'+address);}
					else if(host=='abbc_mainnet') {$("#walletHistory").attr('href',''+address);}
					else if(host=='actinium_mainnet') {$("#walletHistory").attr('href','https://chainmapper.com/acm/address/'+address);}
					else if(host=='adeptio_mainnet') {$("#walletHistory").attr('href',''+address);}
					else if(host=='aegeus_mainnet') {$("#walletHistory").attr('href',''+address);}
					else if(host=="aiascoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/aias/address.dws?'+address);}
					else if(host=="alexandrite_mainnet") {$("#walletHistory").attr('href','https://www.coinexplorer.net/ALEX/address/'+address);}
					else if(host=="aquariuscoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/arco/address.dws?'+address);}
					else if(host=="arepacoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/arepa/address.dws?'+address);}
					else if(host=="argentum_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/arg/address.dws?'+address);}
					else if(host=="aricoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/ari/address.dws?'+address);}
					else if(host=='asiacoin_mainnet') {$("#walletHistory").attr('href',''+address);}
					else if(host=='audiocoin_mainnet') {$("#walletHistory").attr('href',''+address);}
					else if(host=='coinb.in') {$("#walletHistory").attr('href','https://coinb.in/addr/'+address);}
					else if(host=="blocknet_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/block/address.dws?'+address);}
					else if(host=="cypherfunk_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/funk/address.dws?'+address);}
					else if(host=="dash_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/dash/address.dws?'+address);}
					else if(host=="deviantcoin_mainnet") {$("#walletHistory").attr('href','https://www.coinexplorer.net/DEV/address/'+address);}
					else if(host=='digibyte_mainnet') {$("#walletHistory").attr('href','https://chainz.cryptoid.info/dgb/address.dws?'+address);}
					else if(host=="dogecoin_mainnet") {$("#walletHistory").attr('href','https://sochain.com/address/DOGE/'+address);}
					else if(host=='elite_mainnet') {$("#walletHistory").attr('href','https://chainz.cryptoid.info/1337/address.dws?'+address);}
					else if(host=="litecoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/ltc/address.dws?'+address);}
					else if(host=="lynx_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/lynx/address.dws?'+address);}
					else if(host=="mooncoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/moon/address.dws?'+address);}
					else if(host=='mousecoin_mainnet') {$("#walletHistory").attr('href','http://explorer.mousemn.com/address/'+address);}
					else if(host=='infiniterick_mainnet') {$("#walletHistory").attr('href','http://infiniteblocks.space/address/'+address);}
					else if(host=="qtum_mainnet") {$("#walletHistory").attr('href','https://explorer.qtum.org/address/'+address);}
					else if(host=="piratechain_mainnet") {$("#walletHistory").attr('href','https://explorer.pirate.black/address/'+address);}
					else if(host=="axe_mainnet") {$("#walletHistory").attr('href','https://insight.axecore.net/address/'+address);}
					else if(host=="auroracoin_mainnet") {$("#walletHistory").attr('href','http://insight.auroracoin.is/address/'+address);}
					else if(host=="syscoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/sys/address.dws?'+address);}
					else if(host=='utip_mainnet') {$("#walletHistory").attr('href','https://chainz.cryptoid.info/utip/address.dws?'+address);}
					else if(host=="viacoin_mainnet") {$("#walletHistory").attr('href','https://explorer.viacoin.org/address/'+address);}
					else if(host=="zeitcoin_mainnet") {$("#walletHistory").attr('href','https://chainz.cryptoid.info/zeit/address.dws?'+address);}
					else {$("#walletHistory").attr('href','https://coinb.in/addr/'+address);}

					$("#walletQrCode").html("");
					var qrcode = new QRCode("walletQrCode");
					// QRCode Change
					if(host=='pandacoin_mainnet') {
						qrcode.makeCode("pandacoin:"+address);
					} else if(host=='komodo_mainnet') {
						qrcode.makeCode("komodo:"+address);
					} else if(host=='htmlcoin_mainnet') {
						qrcode.makeCode("htmlcoin:"+address);
					} else if(host=='qtum_mainnet') {
						qrcode.makeCode("qtum:"+address);
					} else if(host=='dimecoin_mainnet') {
						qrcode.makeCode("dimecoin:"+address);
					} else if(host=='dogecoin_mainnet') {
						qrcode.makeCode("dogecoin:"+address);
					} else if(host=='peercoin_mainnet') {
						qrcode.makeCode("peercoin:"+address);
					} else if(host=='mintcoin_mainnet') {
						qrcode.makeCode("mintcoin:"+address);
					} else if(host=='aricoin_mainnet') {
						qrcode.makeCode("aricoin:"+address);
					}	else if(host=='utip_mainnet') {
						qrcode.makeCode("utip:"+address);
					}	else if(host=='mooncoin_mainnet') {
						qrcode.makeCode("mooncoin:"+address);
					}	else if(host=='piratechain_mainnet') {
						qrcode.makeCode("piratechain:"+address);
					}	else if(host=='axe_mainnet') {
						qrcode.makeCode("axe:"+address);
					}	else if(host=='auroracoin_mainnet') {
						qrcode.makeCode("auroracoin:"+address);
					} else {
						qrcode.makeCode("bitcoin:"+address);
					}


					$("#walletKeys .privkey").val(wif);
					$("#walletKeys .pubkey").val(pubkey);
					$("#walletKeys .privkeyaes").val(privkeyaes);

					$("#openLogin").hide();
					$("#openWallet").removeClass("hidden").show();

					walletBalance();
				} else {
					$("#openLoginStatus").html("Your passwords do not match!").removeClass("hidden").fadeOut().fadeIn();
				}
			} else {
				$("#openLoginStatus").html("Your password must be at least 10 chars long").removeClass("hidden").fadeOut().fadeIn();
			}
		} else {
			$("#openLoginStatus").html("Your email address doesn't appear to be valid").removeClass("hidden").fadeOut().fadeIn();
		}

		$("#openLoginStatus").prepend('<span class="glyphicon glyphicon-exclamation-sign"></span> ');
	});

	$("#walletLogout").click(function() {
		$("#openEmail").val("");
		$("#openPass").val("");
		$("#openPassConfirm").val("");

		$("#openLogin").show();
		$("#openWallet").addClass("hidden").show();

		$("#walletAddress").html("");
		$("#walletHistory").attr('href',explorer_addr);

		$("#walletQrCode").html("");
		var qrcode = new QRCode("walletQrCode");
		// QRCode Change
		if(host=='pandacoin_mainnet') {
			qrcode.makeCode("pandacoin:");
		} else if(host=='komodo_mainnet') {
			qrcode.makeCode("komodo:");
		} else if(host=='htmlcoin_mainnet') {
			qrcode.makeCode("htmlcoin:");
		} else if(host=='qtum_mainnet') {
			qrcode.makeCode("qtum:");
		} else if(host=='aricoin_mainnet') {
			qrcode.makeCode("aricoin:");
		} else if(host=='dogecoin_mainnet') {
			qrcode.makeCode("dogecoin:");
		} else if(host=='utip_mainnet') {
			qrcode.makeCode("utip:");
		} else if(host=='axe_mainnet') {
			qrcode.makeCode("axe:");
		} else if(host=='mooncoin_mainnet') {
			qrcode.makeCode("mooncoin:");
		} else if(host=='piratechain_mainnet') {
			qrcode.makeCode("piratechain:");
		} else if(host=='auroracoin_mainnet') {
			qrcode.makeCode("auroracoin:");
		} else {
			qrcode.makeCode("bitcoin:");
		}

		$("#walletKeys .privkey").val("");
		$("#walletKeys .pubkey").val("");

		$("#openLoginStatus").html("").hide();
	});

	$("#walletSegwit").click(function() {
		if($(this).is(":checked")) {
			$(".walletSegwitType").attr('disabled',false);
		} else {
			$(".walletSegwitType").attr('disabled',true);
		}
	});

	$("#walletToSegWit").click(function() {
		$("#walletToBtn").html('SegWit <span class="caret"></span>');
		$("#walletSegwit")[0].checked = true;
		$("#walletSegwitp2sh")[0].checked = true;
		$("#openBtn").click();
	});

	$("#walletToSegWitBech32").click(function() {
		$("#walletToBtn").html('Bech32 <span class="caret"></span>');
		$("#walletSegwit")[0].checked = true;
		$("#walletSegwitBech32")[0].checked = true;
		$("#openBtn").click();
	});

	$("#walletToLegacy").click(function() {
		$("#walletToBtn").html('Legacy <span class="caret"></span>');
		$("#walletSegwit")[0].checked = false;
		$("#openBtn").click();
	});


	$("#walletShowKeys").click(function() {
		$("#walletKeys").removeClass("hidden");
		$("#walletSpend").removeClass("hidden").addClass("hidden");
	});

	$("#walletBalance, #walletAddress, #walletQrCode").click(function() {
		walletBalance();
	});

	$("#walletConfirmSend").click(function() {
		var thisbtn = $(this);
		var tx = coinjs.transaction($("#coinjs_utxo option:selected").val());
		var txfee = $("#txFee");
		var devaddr = coinjs.developer;
		var devamount = $("#developerDonation");

		if((devamount.val()*1)>0) {
			tx.addoutput(devaddr, devamount.val()*1);
		}

		var total = (devamount.val()*1) + (txfee.val()*1);

		$.each($("#walletSpendTo .output"), function(i,o) {
			var addr = $('.addressTo',o);
			var amount = $('.amount',o);
			if(amount.val()*1>0) {
				total += amount.val()*1;
				tx.addoutput(addr.val(), amount.val()*1);
			}
		});

		thisbtn.attr('disabled',true);

		var script = false;
		if($("#walletSegwit").is(":checked")) {
			if($("#walletSegwitBech32").is(":checked")) {
				var sw = coinjs.bech32Address($("#walletKeys .pubkey").val());
			} else {
				var sw = coinjs.segwitAddress($("#walletKeys .pubkey").val());
			}
			script = sw.redeemscript;
		}

		var sequence = 0xffffffff-1;
		if($("#walletRBF").is(":checked")) {
			sequence = 0xffffffff-2;
		}

		tx.addUnspent($("#walletAddress").html(), function(data) {
			var host = $("#coinjs_utxo option:selected").val();
			if(host=='dogecoin_mainnet') {
				var dvalue = data.value;
				total = (total*1);
			} else if(host=='litecoin_mainnet') {
				var dvalue = data.value;
				total = (total*1);
			} else if(host=='coinb.in') {
				var dvalue = data.value;
				total = (total*1);
			} else {
			var dvalue = (data.value/100000000).toFixed(8) * 1;
			total = (total*1).toFixed(8) * 1;
		}

			if(dvalue>=total) {
				var change = dvalue-total;
				if((change*1)>0) {
					tx.addoutput($("#walletAddress").html(), change);
				}

				// clone the transaction with out using coinjs.clone() function as it gives us trouble
				var tx2 = coinjs.transaction($("#coinjs_utxo option:selected").val());
				var txunspent = tx2.deserialize(tx.serialize());

				// then sign
				var signed = txunspent.sign($("#walletKeys .privkey").val());

				// and finally broadcast!

				tx2.broadcast(function(data) {
					// Spend Broadcast
					var host = $("#coinjs_utxo option:selected").val();
					if(host=='pandacoin_mainnet') {
            if(data) {
							$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/pnd/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
							$("#walletSendSuccessfulTransaction").removeClass('hidden');
							$("#walletSendSuccessfulTransaction textarea").val(signed);
            } else {
              $("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
              $("#walletSendFailTransaction").removeClass('hidden');
              $("#walletSendFailTransaction textarea").val(signed);
              thisbtn.attr('disabled',false);
          }
				} else if(host=='komodo_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://kmdexplorer.io/tx/' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='htmlcoin_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/html/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='dimecoin_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/dime/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='dogecoin_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://sochain.com/tx/DOGE/' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='peercoin_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/ppc/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='mintcoin_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/mint/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='syscoin_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/sys/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='utip_mainnet') {
				if(data) {
					$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/utip/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
					$("#walletSendSuccessfulTransaction").removeClass('hidden');
					$("#walletSendSuccessfulTransaction textarea").val(signed);
				} else {
					$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
					$("#walletSendFailTransaction").removeClass('hidden');
					$("#walletSendFailTransaction textarea").val(signed);
					thisbtn.attr('disabled',false);
			}
		} else if(host=='mooncoin_mainnet') {
				if(data) {
					$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/moon/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
					$("#walletSendSuccessfulTransaction").removeClass('hidden');
					$("#walletSendSuccessfulTransaction textarea").val(signed);
				} else {
					$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
					$("#walletSendFailTransaction").removeClass('hidden');
					$("#walletSendFailTransaction textarea").val(signed);
					thisbtn.attr('disabled',false);
			}
		} else if(host=='auroracoin_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="http://insight.auroracoin.is/tx/' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='cypherfunk_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/funk/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='aricoin_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/ari/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='dash_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/dash/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} if(host=='lynx_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/lynx/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='blocknet_mainnet') {
					if(data) {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/block/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
						$("#walletSendSuccessfulTransaction").removeClass('hidden');
						$("#walletSendSuccessfulTransaction textarea").val(signed);
					} else {
						$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
						$("#walletSendFailTransaction").removeClass('hidden');
						$("#walletSendFailTransaction textarea").val(signed);
						thisbtn.attr('disabled',false);
				}
			} else if(host=='aiascoin_mainnet') {
            if(data) {
							$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://chainz.cryptoid.info/aias/tx.dws?' + data +'" target="_blank">'+ data +'</a>');
							$("#walletSendSuccessfulTransaction").removeClass('hidden');
							$("#walletSendSuccessfulTransaction textarea").val(signed);
            } else {
              $("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
              $("#walletSendFailTransaction").removeClass('hidden');
              $("#walletSendFailTransaction textarea").val(signed);
              thisbtn.attr('disabled',false);
          }
				} else if(host=='axe_mainnet') {
	            if(data) {
								$("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://insight.axecore.net/tx/' + data +'" target="_blank">'+ data +'</a>');
								$("#walletSendSuccessfulTransaction").removeClass('hidden');
								$("#walletSendSuccessfulTransaction textarea").val(signed);
	            } else {
	              $("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html("Unable to Broadcast")
	              $("#walletSendFailTransaction").removeClass('hidden');
	              $("#walletSendFailTransaction textarea").val(signed);
	              thisbtn.attr('disabled',false);
	          }
					} else if(host=='coinb.in') {
              if($(data).find("result").text()=="1") {
                $("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-success').html('txid: <a href="https://coinb.in/tx/'+$(data).find("txid").text()+'" target="_blank">'+$(data).find("txid").text()+'</a>');
								$("#walletSendSuccessfulTransaction").removeClass('hidden');
								$("#walletSendSuccessfulTransaction textarea").val(signed);
              } else {
                $("#walletSendConfirmStatus").removeClass('hidden').addClass('alert-danger').html(unescape($(data).find("response").text()).replace(/\+/g,' '));
    						$("#walletSendFailTransaction").removeClass('hidden');
    						$("#walletSendFailTransaction textarea").val(signed);
    						thisbtn.attr('disabled',false);
  					}
          }

					// update wallet balance
					walletBalance();

				}, signed);
			} else {
				$("#walletSendConfirmStatus").removeClass("hidden").addClass('alert-danger').html("You have a confirmed balance of "+dvalue+" Coins unable to send "+total+" Coins").fadeOut().fadeIn();
				thisbtn.attr('disabled',false);
			}

			$("#walletLoader").addClass("hidden");

		}, script, script, sequence);
	});

	$("#walletSendBtn").click(function() {

		$("#walletSendFailTransaction").addClass('hidden');
		$("#walletSendStatus").addClass("hidden").html("");

		var thisbtn = $(this);
		var txfee = $("#txFee");
		var devamount = $("#developerDonation");

		if((!isNaN(devamount.val())) && devamount.val()>=0) {
			$(devamount).parent().removeClass('has-error');
		} else {
			$(devamount).parent().addClass('has-error')
		}

		if((!isNaN(txfee.val())) && txfee.val()>=0) {
			$(txfee).parent().removeClass('has-error');
		} else {
			$(txfee).parent().addClass('has-error');
		}

		var total = (devamount.val()*1) + (txfee.val()*1);

		$.each($("#walletSpendTo .output"), function(i,o) {
			var amount = $('.amount',o);
			var address = $('.addressTo',o);

			total += amount.val()*1;

			if((!isNaN($(amount).val())) && $(amount).val()>0) {
				$(amount).parent().removeClass('has-error');
			} else {
				$(amount).parent().addClass('has-error');
			}

			if(coinjs.addressDecode($(address).val())) {
				$(address).parent().removeClass('has-error');
			} else {
				$(address).parent().addClass('has-error');
			}
		});

		total = total.toFixed(8);

		if($("#walletSpend .has-error").length==0) {
			var balance = ($("#walletBalance").html()).replace(/[^0-9\.]+/g,'')*1;
			if(total<=balance) {
				$("#walletSendConfirmStatus").addClass("hidden").removeClass('alert-success').removeClass('alert-danger').html("");
				$("#spendAmount").html(total);
				$("#modalWalletConfirm").modal("show");
				$("#walletConfirmSend").attr('disabled',false);
			} else {
				$("#walletSendStatus").removeClass("hidden").html("You are trying to spend "+total+' but have a balance of '+balance);
			}
		} else {
			$("#walletSpend .has-error").fadeOut().fadeIn();
			$("#walletSendStatus").removeClass("hidden").html('<span class="glyphicon glyphicon-exclamation-sign"></span> One or more input has an error');
		}
	});

	$("#walletShowSpend").click(function() {
		$("#walletSpend").removeClass("hidden");
		$("#walletKeys").removeClass("hidden").addClass("hidden");
	});

	$("#walletSpendTo .addressAdd").click(function() {
		var clone = '<div class="form-horizontal output">'+$(this).parent().html()+'</div>';
		$("#walletSpendTo").append(clone);
		$("#walletSpendTo .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
		$("#walletSpendTo .glyphicon-minus:last").parent().removeClass('addressAdd').addClass('addressRemove');
		$("#walletSpendTo .addressRemove").unbind("");
		$("#walletSpendTo .addressRemove").click(function() {
			$(this).parent().fadeOut().remove();
		});
	});
	function walletBalance() {
		var host = $("#coinjs_utxo option:selected").val();
		if($("#walletLoader").hasClass("hidden")) {
			var tx = coinjs.transaction($("#coinjs_utxo option:selected").val());
			$("#walletLoader").removeClass("hidden");

			coinjs.addressBalance(host, $("#walletAddress").html(),function(data) {
				// Balance Area
				if(host=='pandacoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" PND").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 PND").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='komodo_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" KMD").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 KMD").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='htmlcoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" HTML").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 HTML").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='dimecoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" DIME").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 DIME").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='peercoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" PPC").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 PPC").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='mintcoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" MINT").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 MINT").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='aricoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" ARI").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 ARI").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='utip_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" UTIP").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 UTIP").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='mooncoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" MOON").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 MOON").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='argentum_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" ARG").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 ARG").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='zeitcoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" ZEIT").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 ZEIT").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='arepacoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" AREPA").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 AREPA").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='aquariuscoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" ARCO").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 ARCO").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='aiascoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" AIAS").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 AIAS").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='42coin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" 42").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 42").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='aegeus_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" AEG").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 AEG").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='asiacoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" AC").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 AC").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='actinium_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" ACM").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 ACM").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='adeptio_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" ADE").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 ADE").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='abbc_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" ABBC").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 ABBC").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='elite_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" 1337").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 1337").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='2give_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" 2GIVE").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 2GIVE").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='1x2coin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" 1X2").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 1X2").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='2x2_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" 2X2").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 2X2").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='404_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" 404").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 404").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='digibyte_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" DGB").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 DGB").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='infiniterick_mainnet') {
					if(data) {
						var v = data;
						$("#walletBalance").html(v+" RICK").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 RICK").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='mousecoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" MOUSE").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 MOUSE").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='qtum_mainnet') {
                var parsed = JSON.parse(data)
                if(parsed.type==='error') {
                  $("#walletBalance").html("0 QTUM").attr('rel',v).fadeOut().fadeIn();
                }
                else {
                $("#walletBalance").html((parsed/100000000).toFixed(8) + " QTUM").attr('rel',v).fadeOut().fadeIn();
              }
        } else if(host=='piratechain_mainnet') {
                var parsed = JSON.parse(data)
                if(parsed.type==='error') {
                  $("#walletBalance").html("0 ARRR").attr('rel',v).fadeOut().fadeIn();
                }
                else {
                $("#walletBalance").html((parsed/100000000).toFixed(8) + " ARRR").attr('rel',v).fadeOut().fadeIn();
              }
        } else if(host=='axe_mainnet') {
                var parsed = JSON.parse(data)
                if(parsed.type==='error') {
                  $("#walletBalance").html("0 AXE").attr('rel',v).fadeOut().fadeIn();
                }
                else {
                $("#walletBalance").html((parsed/100000000).toFixed(8) + " AXE").attr('rel',v).fadeOut().fadeIn();
              }
        } else if(host=='auroracoin_mainnet') {
                var parsed = JSON.parse(data)
                if(parsed.type==='error') {
                  $("#walletBalance").html("0 AX").attr('rel',v).fadeOut().fadeIn();
                }
                else {
                $("#walletBalance").html((parsed/100000000).toFixed(8) + " AUR").attr('rel',v).fadeOut().fadeIn();
              }
        } else if(host=='lynx_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" LYNX").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 LYNX").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='dash_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" DASH").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 DASH").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='syscoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" SYS").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 SYS").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='blocknet_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" BLOCK").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 BLOCK").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='viacoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" VIA").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 VIA").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='litecoin_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v+" LTC").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 LTC").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='dogecoin_mainnet') {
					if(data) {
						var v = data;
						$("#walletBalance").html(v+" DOGE").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 DOGE").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='cypherfunk_mainnet') {
					if(data) {
						var v = data
						$("#walletBalance").html(v +" FUNK").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 FUNK").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='deviantcoin_mainnet') {
						var parsed = JSON.parse(data)
						if(parsed.type==='error') {
							$("#walletBalance").html("0 DEV").attr('rel',v).fadeOut().fadeIn();
						}	else if(data) {
						var v = parsed.result[$("#walletAddress").html()];
						$("#walletBalance").html(v + " DEV").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 DEV").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='alexandrite_mainnet') {
						var parsed = JSON.parse(data)
						if(parsed.type==='error') {
							$("#walletBalance").html("0 ALEX").attr('rel',v).fadeOut().fadeIn();
						}	else if(data) {
						var v = parsed.result[$("#walletAddress").html()];
						$("#walletBalance").html(v + " ALEX").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 DEV").attr('rel',v).fadeOut().fadeIn();
					}
				} else if(host=='coinb.in') {
					if($(data).find("result").text()==1) {
						var v = $(data).find("balance").text()/100000000;
						$("#walletBalance").html(v+" BTC").attr('rel',v).fadeOut().fadeIn();
					} else {
						$("#walletBalance").html("0 BTC").attr('rel',v).fadeOut().fadeIn();
					}
				}

				$("#walletLoader").addClass("hidden");
			});
		}
	}

	/* new -> address code */

	$("#newKeysBtn").click(function() {
		coinjs.compressed = false;
		if($("#newCompressed").is(":checked")) {
			coinjs.compressed = true;
		}
		var s = ($("#newBrainwallet").is(":checked")) ? $("#brainwallet").val() : null;
		var coin = coinjs.newKeys(s);
		$("#newBitcoinAddress").val(coin.address);
		$("#newPubKey").val(coin.pubkey);
		$("#newPrivKey").val(coin.wif);

		/* encrypted key code */
		if((!$("#encryptKey").is(":checked")) || $("#aes256pass").val()==$("#aes256pass_confirm").val()) {
			$("#aes256passStatus").addClass("hidden");
			if($("#encryptKey").is(":checked")) {
				$("#aes256wifkey").removeClass("hidden");
			}
		} else {
			$("#aes256passStatus").removeClass("hidden");
		}
		$("#newPrivKeyEnc").val(CryptoJS.AES.encrypt(coin.wif, $("#aes256pass").val())+'');
	});

	$("#newPaperwalletBtn").click(function() {
		if($("#newBitcoinAddress").val()=="") {
			$("#newKeysBtn").click();
		}

		var paperwallet = window.open();
		paperwallet.document.write('<h2>BTC PaperWallet</h2><hr><div style="margin-top: 5px; margin-bottom: 5px"><div><h3 style="margin-top: 0">Address (Share)</h3></div><div style="text-align: center;"><div id="qraddress"></div><p>'+$("#newBitcoinAddress").val()+'</p></div></div><hr><div style="margin-top: 5px; margin-bottom: 5px"><div><h3 style="margin-top: 0">Public Key</h3></div><div style="text-align: center;"><div id="qrpubkey"></div><p>'+$("#newPubKey").val()+'</p></div></div><hr><div style="margin-top: 5px; margin-bottom: 5px"><div><h3 style="margin-top: 0">Private Key (KEEP SECRET!)</h3></div><div style="text-align: center;"><div id="qrprivkey"></div><p>'+$("#newPrivKey").val()+'</p></div></div>');
		paperwallet.document.close();
		paperwallet.focus();
		new QRCode(paperwallet.document.getElementById("qraddress"), {text: $("#newBitcoinAddress").val(), width: 125, height: 125});
		new QRCode(paperwallet.document.getElementById("qrpubkey"), {text: $("#newPubKey").val(), width: 125, height: 125});
		new QRCode(paperwallet.document.getElementById("qrprivkey"), {text: $("#newPrivKey").val(), width: 125, height: 125});
		paperwallet.print();
		paperwallet.close();
	});

	$("#newBrainwallet").click(function() {
		if($(this).is(":checked")) {
			$("#brainwallet").removeClass("hidden");
		} else {
			$("#brainwallet").addClass("hidden");
		}
	});

	$("#newSegWitBrainwallet").click(function() {
		if($(this).is(":checked")) {
			$("#brainwalletSegWit").removeClass("hidden");
		} else {
			$("#brainwalletSegWit").addClass("hidden");
		}
	});

	$("#encryptKey").click(function() {
		if($(this).is(":checked")) {
			$("#aes256passform").removeClass("hidden");
		} else {
			$("#aes256wifkey, #aes256passform, #aes256passStatus").addClass("hidden");
		}
	});

	/* new -> segwit code */
	$("#newSegWitKeysBtn").click(function() {
		var compressed = coinjs.compressed;
		coinjs.compressed = true;

		var s = ($("#newSegWitBrainwallet").is(":checked")) ? $("#brainwalletSegWit").val() : null;
		var coin = coinjs.newKeys(s);

		if($("#newSegWitBech32addr").is(":checked")) {
			var sw = coinjs.bech32Address(coin.pubkey);
		} else {
			var sw = coinjs.segwitAddress(coin.pubkey);
		}

		$("#newSegWitAddress").val(sw.address);
		$("#newSegWitRedeemScript").val(sw.redeemscript);
		$("#newSegWitPubKey").val(coin.pubkey);
		$("#newSegWitPrivKey").val(coin.wif);
		coinjs.compressed = compressed;
	});

	$("#newSegwitPaperwalletBtn").click(function() {
		if($("#newSegWitAddress").val()=="") {
			$("#newSegWitKeysBtn").click();
		}

		var paperwallet = window.open();
		paperwallet.document.write('<h2>BTC SegWit PaperWallet</h2><hr><div style="margin-top: 5px; margin-bottom: 5px"><div><h3 style="margin-top: 0">Address (Share)</h3></div><div style="text-align: center;"><div id="qraddress"></div><p>'+$("#newSegWitAddress").val()+'</p></div></div><hr><div style="margin-top: 5px; margin-bottom: 5px"><div><h3 style="margin-top: 0">Public Key</h3></div><div style="text-align: center;"><div id="qrpubkey"></div><p>'+$("#newSegWitPubKey").val()+'</p></div></div><hr><div style="margin-top: 5px; margin-bottom: 5px"><div><h3 style="margin-top: 0">Redeem Script</h3></div><div style="text-align: center;"><div id="qrredeem"></div><p>'+$("#newSegWitRedeemScript").val()+'</p></div></div><hr><div style="margin-top: 5px; margin-bottom: 5px"><div><h3 style="margin-top: 0">Private Key (KEEP SECRET!)</h3></div><div style="text-align: center;"><div id="qrprivkey"></div><p>'+$("#newSegWitPrivKey").val()+'</p></div></div>');
		paperwallet.document.close();
		paperwallet.focus();
		new QRCode(paperwallet.document.getElementById("qraddress"), {text: $("#newSegWitAddress").val(), width: 110, height: 110});
		new QRCode(paperwallet.document.getElementById("qrpubkey"), {text: $("#newSegWitPubKey").val(), width: 110, height: 110});
		new QRCode(paperwallet.document.getElementById("qrredeem"), {text: $("#newSegWitRedeemScript").val(), width: 110, height: 110});
		new QRCode(paperwallet.document.getElementById("qrprivkey"), {text: $("#newSegWitPrivKey").val(), width: 110, height: 110});
		paperwallet.print();
		paperwallet.close();
	});

	/* new -> multisig code */

	$("#newMultiSigAddress").click(function() {

		$("#multiSigData").removeClass('show').addClass('hidden').fadeOut();
		$("#multisigPubKeys .pubkey").parent().removeClass('has-error');
		$("#releaseCoins").parent().removeClass('has-error');
		$("#multiSigErrorMsg").hide();

		if((isNaN($("#releaseCoins option:selected").html())) || ((!isNaN($("#releaseCoins option:selected").html())) && ($("#releaseCoins option:selected").html()>$("#multisigPubKeys .pubkey").length || $("#releaseCoins option:selected").html()*1<=0 || $("#releaseCoins option:selected").html()*1>8))) {
			$("#releaseCoins").parent().addClass('has-error');
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Minimum signatures required is greater than the amount of public keys provided').fadeIn();
			return false;
		}

		var keys = [];
		$.each($("#multisigPubKeys .pubkey"), function(i,o) {
			if(coinjs.pubkeydecompress($(o).val())) {
				keys.push($(o).val());
				$(o).parent().removeClass('has-error');
			} else {
				$(o).parent().addClass('has-error');
			}
		});

		if(($("#multisigPubKeys .pubkey").parent().hasClass('has-error')==false) && $("#releaseCoins").parent().hasClass('has-error')==false) {
			var sigsNeeded = $("#releaseCoins option:selected").html();
			var multisig =  coinjs.pubkeys2MultisigAddress(keys, sigsNeeded);
			if(multisig.size <= 520) {
				$("#multiSigData .address").val(multisig['address']);
				$("#multiSigData .script").val(multisig['redeemScript']);
				$("#multiSigData .scriptUrl").val(document.location.origin+''+document.location.pathname+'?verify='+multisig['redeemScript']+'#verify');
				$("#multiSigData").removeClass('hidden').addClass('show').fadeIn();
				$("#releaseCoins").removeClass('has-error');
			} else {
				$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Your generated redeemscript is too large (>520 bytes) it can not be used safely').fadeIn();
			}
		} else {
			$("#multiSigErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> One or more public key is invalid!').fadeIn();
		}
	});

	$("#multisigPubKeys .pubkeyAdd").click(function() {
		if($("#multisigPubKeys .pubkeyRemove").length<14) {
			var clone = '<div class="form-horizontal">'+$(this).parent().html()+'</div>';
			$("#multisigPubKeys").append(clone);
			$("#multisigPubKeys .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
			$("#multisigPubKeys .glyphicon-minus:last").parent().removeClass('pubkeyAdd').addClass('pubkeyRemove');
			$("#multisigPubKeys .pubkeyRemove").unbind("");
			$("#multisigPubKeys .pubkeyRemove").click(function() {
				$(this).parent().fadeOut().remove();
			});
		}
	});

	$("#mediatorList").change(function() {
		var data = ($(this).val()).split(";");
		$("#mediatorPubkey").val(data[0]);
		$("#mediatorEmail").val(data[1]);
		$("#mediatorFee").val(data[2]);
	}).change();

	$("#mediatorAddKey").click(function() {
		var count = 0;
		var len = $(".pubkeyRemove").length;
		if(len<14) {
			$.each($("#multisigPubKeys .pubkey"),function(i,o) {
				if($(o).val()=='') {
					$(o).val($("#mediatorPubkey").val()).fadeOut().fadeIn();
					$("#mediatorClose").click();
					return false;
				} else if(count==len) {
					$("#multisigPubKeys .pubkeyAdd").click();
					$("#mediatorAddKey").click();
					return false;
				}
				count++;
			});

			$("#mediatorClose").click();
		}
	});

	/* new -> time locked code */

	$('#timeLockedDateTimePicker').datetimepicker({
		format: "MM/DD/YYYY HH:mm",
	});

	$('#timeLockedRbTypeBox input').change(function() {
		if ($('#timeLockedRbTypeDate').is(':checked')) {
			$('#timeLockedDateTimePicker').show();
			$('#timeLockedBlockHeight').hide();
		} else {
			$('#timeLockedDateTimePicker').hide();
			$('#timeLockedBlockHeight').removeClass('hidden').show();
		}
	});

    $("#newTimeLockedAddress").click(function() {

        $("#timeLockedData").removeClass('show').addClass('hidden').fadeOut();
        $("#timeLockedPubKey").parent().removeClass('has-error');
        $("#timeLockedDateTimePicker").parent().removeClass('has-error');
        $("#timeLockedErrorMsg").hide();

        if(!coinjs.pubkeydecompress($("#timeLockedPubKey").val())) {
        	$('#timeLockedPubKey').parent().addClass('has-error');
        }

        var nLockTime = -1;

        if ($('#timeLockedRbTypeDate').is(':checked')) {
        	// by date
	        var date = $('#timeLockedDateTimePicker').data("DateTimePicker").date();
	        if(!date || !date.isValid()) {
	        	$('#timeLockedDateTimePicker').parent().addClass('has-error');
	        }
	        nLockTime = date.unix()
	        if (nLockTime < 500000000) {
	        	$('#timeLockedDateTimePicker').parent().addClass('has-error');
	        }
        } else {
			nLockTime = parseInt($('#timeLockedBlockHeightVal').val(), 10);
	        if (nLockTime >= 500000000) {
	        	$('#timeLockedDateTimePicker').parent().addClass('has-error');
	        }
        }

        if(($("#timeLockedPubKey").parent().hasClass('has-error')==false) && $("#timeLockedDateTimePicker").parent().hasClass('has-error')==false) {
        	try {
	            var hodl = coinjs.simpleHodlAddress($("#timeLockedPubKey").val(), nLockTime);
	            $("#timeLockedData .address").val(hodl['address']);
	            $("#timeLockedData .script").val(hodl['redeemScript']);
	            $("#timeLockedData .scriptUrl").val(document.location.origin+''+document.location.pathname+'?verify='+hodl['redeemScript']+'#verify');
	            $("#timeLockedData").removeClass('hidden').addClass('show').fadeIn();
	        } catch(e) {
	        	$("#timeLockedErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + e).fadeIn();
	        }
        } else {
            $("#timeLockedErrorMsg").html('<span class="glyphicon glyphicon-exclamation-sign"></span> Public key and/or date is invalid!').fadeIn();
        }
    });

	/* new -> Hd address code */

	$(".deriveHDbtn").click(function() {
		$("#verifyScript").val($("input[type='text']",$(this).parent().parent()).val());
		window.location = "#verify";
		$("#verifyBtn").click();
	});

	$("#newHDKeysBtn").click(function() {
		coinjs.compressed = true;
		var s = ($("#newHDBrainwallet").is(":checked")) ? $("#HDBrainwallet").val() : null;
		var hd = coinjs.hd();
		var pair = hd.master(s);
		$("#newHDxpub").val(pair.pubkey);
		$("#newHDxprv").val(pair.privkey);

	});

	$("#newHDBrainwallet").click(function() {
		if($(this).is(":checked")) {
			$("#HDBrainwallet").removeClass("hidden");
		} else {
			$("#HDBrainwallet").addClass("hidden");
		}
	});

	/* new -> transaction code */

	$("#recipients .addressAddTo").click(function() {
		if($("#recipients .addressRemoveTo").length<19) {
			var clone = '<div class="row recipient"><br>'+$(this).parent().parent().html()+'</div>';
			$("#recipients").append(clone);
			$("#recipients .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
			$("#recipients .glyphicon-minus:last").parent().removeClass('addressAdd').addClass('addressRemoveTo');
			$("#recipients .addressRemoveTo").unbind("");
			$("#recipients .addressRemoveTo").click(function() {
				$(this).parent().parent().fadeOut().remove();
				validateOutputAmount();
			});
			validateOutputAmount();
		}
	});

	$("#inputs .txidAdd").click(function() {
		var clone = '<div class="row inputs"><br>'+$(this).parent().parent().html()+'</div>';
		$("#inputs").append(clone);
		$("#inputs .txidClear:last").remove();
		$("#inputs .glyphicon-plus:last").removeClass('glyphicon-plus').addClass('glyphicon-minus');
		$("#inputs .glyphicon-minus:last").parent().removeClass('txidAdd').addClass('txidRemove');
		$("#inputs .txidRemove").unbind("");
		$("#inputs .txidRemove").click(function() {
			$(this).parent().parent().fadeOut().remove();
			totalInputAmount();
		});
		$("#inputs .row:last input").attr('disabled',false);

		$("#inputs .txIdAmount").unbind("").change(function() {
			totalInputAmount();
		}).keyup(function() {
			totalInputAmount();
		});

	});

	$("#transactionBtn").click(function() {
		var tx = coinjs.transaction($("#coinjs_utxo option:selected").val());
		var estimatedTxSize = 10; // <4:version><1:txInCount><1:txOutCount><4:nLockTime>

		$("#transactionCreate, #transactionCreateStatus").addClass("hidden");

		if(($("#nLockTime").val()).match(/^[0-9]+$/g)) {
			tx.lock_time = $("#nLockTime").val()*1;
		}

		$("#inputs .row").removeClass('has-error');

		$('#putTabs a[href="#txinputs"], #putTabs a[href="#txoutputs"]').attr('style','');

		$.each($("#inputs .row"), function(i,o) {
			if(!($(".txId",o).val()).match(/^[a-f0-9]+$/i)) {
				$(o).addClass("has-error");
			} else if((!($(".txIdScript",o).val()).match(/^[a-f0-9]+$/i)) && $(".txIdScript",o).val()!="") {
				$(o).addClass("has-error");
			} else if (!($(".txIdN",o).val()).match(/^[0-9]+$/i)) {
				$(o).addClass("has-error");
			}

			if(!$(o).hasClass("has-error")) {
				var seq = 0xffffffff-1;
				if($("#txRBF").is(":checked")) {
					seq = 0xffffffff-2;
				}

				var currentScript = $(".txIdScript",o).val();
				if (currentScript.match(/^76a914[0-9a-f]{40}88ac$/)) {
					estimatedTxSize += 147
				} else if (currentScript.match(/^5[1-9a-f](?:210[23][0-9a-f]{64}) {1,15}5[1-9a-f]ae$/)) {
					// <74:persig <1:push><72:sig><1:sighash> ><34:perpubkey <1:push><33:pubkey> > <32:prevhash><4:index><4:nSequence><1:m><1:n><1:OP>
					var scriptSigSize = (parseInt(currentScript.slice(1,2),16) * 74) + (parseInt(currentScript.slice(-3,-2),16) * 34) + 43
					// varint 2 bytes if scriptSig is > 252
					estimatedTxSize += scriptSigSize + (scriptSigSize > 252 ? 2 : 1)
				} else {
					// underestimating won't hurt. Just showing a warning window anyways.
					estimatedTxSize += 147
				}

				tx.addinput($(".txId",o).val(), $(".txIdN",o).val(), $(".txIdScript",o).val(), seq);
			} else {
				$('#putTabs a[href="#txinputs"]').attr('style','color:#a94442;');
			}
		});

		$("#recipients .row").removeClass('has-error');

		$.each($("#recipients .row"), function(i,o) {
			var a = ($(".address",o).val());
			var ad = coinjs.addressDecode(a);
			if(((a!="") && (ad.version == coinjs.pub || ad.version == coinjs.multisig || ad.type=="bech32")) && $(".amount",o).val()!="") { // address
				// P2SH output is 32, P2PKH is 34
				estimatedTxSize += (ad.version == coinjs.pub ? 34 : 32)
				tx.addoutput(a, $(".amount",o).val());
			} else if (((a!="") && ad.version === 42) && $(".amount",o).val()!="") { // stealth address
				// 1 P2PKH and 1 OP_RETURN with 36 bytes, OP byte, and 8 byte value
				estimatedTxSize += 78
				tx.addstealth(ad, $(".amount",o).val());
			} else if (((($("#opReturn").is(":checked")) && a.match(/^[a-f0-9]+$/ig)) && a.length<160) && (a.length%2)==0) { // data
				estimatedTxSize += (a.length / 2) + 1 + 8
				tx.adddata(a);
			} else { // neither address nor data
				$(o).addClass('has-error');
				$('#putTabs a[href="#txoutputs"]').attr('style','color:#a94442;');
			}
		});


		if(!$("#recipients .row, #inputs .row").hasClass('has-error')) {

			$("#transactionCreate textarea").val(tx.serialize());
			$("#transactionCreate .txSize").html(tx.size());

			if($("#feesestnewtx").attr('est')=='y') {
				$("#fees .txhex").val($("#transactionCreate textarea").val());
				$("#feesAnalyseBtn").click();
				$("#fees .txhex").val("");
				window.location = "#fees";
			} else {

				$("#transactionCreate").removeClass("hidden");

				// Check fee against hard 0.01 as well as fluid 200 satoshis per byte calculation.
				if($("#transactionFee").val()>=0.01 || $("#transactionFee").val()>= estimatedTxSize * 200 * 1e-8) {
					$("#modalWarningFeeAmount").html($("#transactionFee").val());
					$("#modalWarningFee").modal("show");
				}
			}
			$("#feesestnewtx").attr('est','');
		} else {
			$("#transactionCreateStatus").removeClass("hidden").html("One or more input or output is invalid").fadeOut().fadeIn();
		}
	});

	$("#feesestnewtx").click(function() {
		$(this).attr('est','y');
		$("#transactionBtn").click();
	});

	$("#feesestwallet").click(function() {
		$(this).attr('est','y');
		var outputs = $("#walletSpendTo .output").length;

		$("#fees .inputno, #fees .outputno, #fees .bytes").html(0);
		$("#fees .slider").val(0);

		var tx = coinjs.transaction($("#coinjs_utxo option:selected").val());
		tx.listUnspent($("#walletAddress").html(), function(data) {
			var inputs = $(data).find("unspent").children().length;
			if($("#walletSegwit").is(":checked")) {
				$("#fees .txi_segwit").val(inputs);
				$("#fees .txi_segwit").trigger('input');
			} else {
				$("#fees .txi_regular").val(inputs);
				$("#fees .txi_regular").trigger('input');
			}

			$.each($("#walletSpendTo .output"), function(i,o) {
				var addr = $('.addressTo',o);
				var ad = coinjs.addressDecode(addr.val());
				if (ad.version == coinjs.pub) { // p2pkh
					$("#fees .txo_p2pkh").val(($("#fees .txo_p2pkh").val()*1)+1);
					$("#fees .txo_p2pkh").trigger('input');
				} else { // p2psh
					$("#fees .txo_p2sh").val(($("#fees .txo_p2sh").val()*1)+1);
					$("#fees .txo_p2sh").trigger('input');
				}
			});

			if(($("#developerDonation").val()*1)>0) {
				var addr = coinjs.developer;
				var ad = coinjs.addressDecode(addr);
				if (ad.version == coinjs.pub) { // p2pkh
					$("#fees .txo_p2pkh").val(($("#fees .txo_p2pkh").val()*1)+1);
					$("#fees .txo_p2pkh").trigger('input');
				} else { // p2psh
					$("#fees .txo_p2sh").val(($("#fees .txo_p2sh").val()*1)+1);
					$("#fees .txo_p2sh").trigger('input');
				}
			}

		});

		//feeStats();
		window.location = "#fees";
	});

	$(".txidClear").click(function() {
		$("#inputs .row:first input").attr('disabled',false);
		$("#inputs .row:first input").val("");
		totalInputAmount();
	});

	$("#inputs .txIdAmount").unbind("").change(function() {
		totalInputAmount();
	}).keyup(function() {
		totalInputAmount();
	});

	$("#donateTxBtn").click(function() {

		var exists = false;

		$.each($("#recipients .address"), function(i,o) {
			if($(o).val() == coinjs.developer) {
				exists = true;
				$(o).fadeOut().fadeIn();
				return true;
			}
		});

		if(!exists) {
			if($("#recipients .recipient:last .address:last").val() != "") {
				$("#recipients .addressAddTo:first").click();
			};

			$("#recipients .recipient:last .address:last").val(coinjs.developer).fadeOut().fadeIn();

			return true;
		}
	});

	/* code for the qr code scanner */

	$(".qrcodeScanner").click(function() {
		if ((typeof MediaStreamTrack === 'function') && typeof MediaStreamTrack.getSources === 'function') {
			MediaStreamTrack.getSources(function(sourceInfos) {
				var f = 0;
				$("select#videoSource").html("");
				for (var i = 0; i !== sourceInfos.length; ++i) {
					var sourceInfo = sourceInfos[i];
					var option = document.createElement('option');
					option.value = sourceInfo.id;
					if (sourceInfo.kind === 'video') {
						option.text = sourceInfo.label || 'camera ' + ($("select#videoSource options").length + 1);
						$(option).appendTo("select#videoSource");
 					}
				}
			});

			$("#videoSource").unbind("change").change(function() {
				scannerStart()
			});

		} else {
			$("#videoSource").addClass("hidden");
		}
		scannerStart();
		$("#qrcode-scanner-callback-to").html($(this).attr('forward-result'));
	});

	function scannerStart() {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || false;
		if(navigator.getUserMedia) {
			if (!!window.stream) {
				$("video").attr('src',null);
				window.stream.stop();
  			}

			var videoSource = $("select#videoSource").val();
			var constraints = {
				video: {
					optional: [{sourceId: videoSource}]
				}
			};

			navigator.getUserMedia(constraints, function(stream) {
				window.stream = stream; // make stream available to console
				var videoElement = document.querySelector('video');
				videoElement.src = window.URL.createObjectURL(stream);
				videoElement.play();
			}, function(error) { });

			QCodeDecoder().decodeFromCamera(document.getElementById('videoReader'), function(er,data) {
				if(!er) {
					var match = data.match(/^bitcoin\:([13][a-z0-9]{26,33})/i);
					var result = match ? match[1] : data;
					$(""+$("#qrcode-scanner-callback-to").html()).val(result);
					$("#qrScanClose").click();
				}
			});
		} else {
			$("#videoReaderError").removeClass("hidden");
			$("#videoReader, #videoSource").addClass("hidden");
		}
	}

	/* redeem from button code */

	$("#redeemFromBtn").click(function() {
		var redeem = redeemingFrom($("#redeemFrom").val());

		$("#redeemFromStatus, #redeemFromAddress").addClass('hidden');

		if(redeem.from=='multisigAddress') {
			$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> You should use the redeem script, not the multisig address!');
			return false;
		}

		if(redeem.from=='other') {
			$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> The address or redeem script you have entered is invalid');
			return false;
		}

		if($("#clearInputsOnLoad").is(":checked")) {
			$("#inputs .txidRemove, #inputs .txidClear").click();
		}

		$("#redeemFromBtn").html("Please wait, loading...").attr('disabled',true);

		var host = $(this).attr('rel');

        // api:             blockcypher     blockchair      chain.so
        // network name     "btc"           "bitcoin"       "BTC"
        // network name     "ltc"           "litecoin"      "LTC"
        // network name     "doge"          "dogecoin"      "DOGE"

		if(host=='pandacoin_mainnet') {
			listUnspentPandacoin(redeem);
		} else if(host=='komodo_mainnet') {
			listUnspentKomodo(redeem);
		} else if(host=='htmlcoin_mainnet') {
			listUnspentHtmlCoin(redeem);
		} else if(host=='dimecoin_mainnet') {
			listUnspentDimeCoin(redeem);
		} else if(host=='peercoin_mainnet') {
			listUnspentPeerCoin(redeem);
		} else if(host=='mintcoin_mainnet') {
			listUnspentMintCoin(redeem);
		} else if(host=='1x2coin_mainnet') {
			listUnspent1x2(redeem);
		} else if(host=='2x2_mainnet') {
			listUnspent2x2(redeem);
		} else if(host=='2give_mainnet') {
			listUnspent2Give(redeem);
		} else if(host=='404_mainnet') {
			listUnspent404(redeem);
		} else if(host=='42coin_mainnet') {
			listUnspent42Coin(redeem);
		} else if(host=='abbc_mainnet') {
			listUnspentAbbc(redeem);
		} else if(host=='actinium_mainnet') {
			listUnspentActinium(redeem);
		} else if(host=='adeptio_mainnet') {
			listUnspentAdeptio(redeem);
		} else if(host=='aegeus_mainnet') {
			listUnspentAegeus(redeem);
		} else if(host=='aiascoin_mainnet') {
			listUnspentAiasCoin(redeem);
		} else if(host=='alexandrite_mainnet') {
			listUnspentAlexandrite(redeem);
		} else if(host=='aquariuscoin_mainnet') {
			listUnspentAquariusCoin(redeem);
		} else if(host=='auroracoin_mainnet') {
			listUnspentAuroraCoin(redeem);
		} else if(host=='arepacoin_mainnet') {
			listUnspentArepaCoin(redeem);
		} else if(host=='argentum_mainnet') {
			listUnspentArgentum(redeem);
		} if(host=='aricoin_mainnet') {
			listUnspentAricoin(redeem);
		} else if(host=='asiacoin_mainnet') {
			listUnspentAsiacoin(redeem);
		} else if(host=='audiocoin_mainnet') {
			listUnspentAudioCoin(redeem);
		} else if(host=='coinb.in') {
			listUnspentChainso(redeem, "BTC");
		}	else if(host=='blocknet_mainnet') {
			listUnspentBlocknet(redeem);
		} else if(host=='cypherfunk_mainnet') {
			listUnspentcypherfunk(redeem);
		} else if(host=='dash_mainnet') {
			listUnspentDash(redeem);
		} else if(host=='deviantcoin_mainnet') {
			listUnspentDeviantCoin(redeem);
		} else if(host=='digibyte_mainnet') {
			listUnspentDigiByte(redeem);
		} else if(host=='dogecoin_mainnet') {
			listUnspentChainso(redeem, "DOGE");
		} else if(host=='elite_mainnet') {
			listUnspentElite(redeem);
		} else if(host=='litecoin_mainnet') {
			listUnspentChainso(redeem, "LTC");
		} else if(host=='axe_mainnet') {
			listUnspentAxe(redeem);
		} else if(host=='lynx_mainnet') {
			listUnspentLynx(redeem);
		} else if(host=='mousecoin_mainnet') {
			listUnspentMouseMN(redeem);
		} else if(host=='infiniterick_mainnet') {
			listUnspentInfiniteRick(redeem);
		} else if(host=='qtum_mainnet') {
			listUnspentqtum(redeem);
		} else if(host=='piratechain_mainnet') {
			listUnspentPirateChain(redeem);
		} else if(host=='syscoin_mainnet') {
			listUnspentsyscoin(redeem);
		} else if(host=='utip_mainnet') {
			listUnspentuTip(redeem);
		} else if(host=='viacoin_mainnet') {
			listUnspentviacoin(redeem);
    } else if(host=='zeitcoin_mainnet') {
			listUnspentZeitCoin(redeem);
		}	else if(host=='mooncoin_mainnet') {
			listUnspentMoonCoin(redeem);
		}	else {
			listUnspentDefault(redeem);
		}
		// List Unspent Area

		if($("#redeemFromStatus").hasClass("hidden")) {
			// An ethical dilemma: Should we automatically set nLockTime?
			if(redeem.from == 'redeemScript' && redeem.type == "hodl__") {
				$("#nLockTime").val(redeem.decodescript.checklocktimeverify);
			} else {
				$("#nLockTime").val(0);
			}
		}
	});

	/* function to determine what we are redeeming from */
	function redeemingFrom(string) {
		var r = {};
		var decode = coinjs.addressDecode(string);
		if(decode.version == coinjs.pub) { // regular address
			r.addr = string;
			r.from = 'address';
			r.redeemscript = false;
		} else if (decode.version == coinjs.priv) { // wif key
			var a = coinjs.wif2address(string);
			r.addr = a['address'];
			r.from = 'wif';
			r.redeemscript = false;
		} else if (decode.version == coinjs.multisig) { // mulisig address
			r.addr = '';
			r.from = 'multisigAddress';
			r.redeemscript = false;
		} else if(decode.type == 'bech32') {
			r.addr = string;
			r.from = 'bech32';
			r.decodedRs = decode.redeemscript;
			r.redeemscript = true;
		} else {
			var script = coinjs.script();
			var decodeRs = script.decodeRedeemScript(string);
			if(decodeRs) { // redeem script
				r.addr = decodeRs['address'];
				r.from = 'redeemScript';
				r.decodedRs = decodeRs.redeemscript;
				r.type = decodeRs['type'];
				r.redeemscript = true;
				r.decodescript = decodeRs;
			} else { // something else
				r.addr = '';
				r.from = 'other';
				r.redeemscript = false;
			}
		}
		return r;
	}

	/* mediator payment code for when you used a public key */
	function mediatorPayment(redeem) {

		if(redeem.from=="redeemScript") {

			$('#recipients .row[rel="'+redeem.addr+'"]').parent().remove();

			$.each(redeem.decodedRs.pubkeys, function(i, o) {
				$.each($("#mediatorList option"), function(mi, mo) {

					var ms = ($(mo).val()).split(";");

					var pubkey = ms[0]; // mediators pubkey
					var fee = ms[2]*1; // fee in a percentage
					var payto = coinjs.pubkey2address(pubkey); // pay to mediators address

					if(o==pubkey) { // matched a mediators pubkey?

						var clone = '<span><div class="row recipients mediator mediator_'+pubkey+'" rel="'+redeem.addr+'">'+$("#recipients .addressAddTo").parent().parent().html()+'</div><br></span>';
						$("#recipients").prepend(clone);

						$("#recipients .mediator_"+pubkey+" .glyphicon-plus:first").removeClass('glyphicon-plus');
						$("#recipients .mediator_"+pubkey+" .address:first").val(payto).attr('disabled', true).attr('readonly',true).attr('title','Medation fee for '+$(mo).html());

						var amount = ((fee*$("#totalInput").html())/100).toFixed(8);
						$("#recipients .mediator_"+pubkey+" .amount:first").attr('disabled',(((amount*1)==0)?false:true)).val(amount).attr('title','Medation fee for '+$(mo).html());
					}
				});
			});

			validateOutputAmount();
		}
	}

	/* global function to add outputs to page */
	function addOutput(tx, n, script, amount) {
		if(tx) {
			if($("#inputs .txId:last").val()!="") {
				$("#inputs .txidAdd").click();
			}

			$("#inputs .row:last input").attr('disabled',true);

			var txid = ((tx).match(/.{1,2}/g).reverse()).join("")+'';

			$("#inputs .txId:last").val(txid);
			$("#inputs .txIdN:last").val(n);
			$("#inputs .txIdAmount:last").val(amount);

			if(((script.match(/^00/) && script.length==44)) || (script.length==40 && script.match(/^[a-f0-9]+$/gi))) {
				s = coinjs.script();
				s.writeBytes(Crypto.util.hexToBytes(script));
				s.writeOp(0);
				s.writeBytes(coinjs.numToBytes((amount*100000000).toFixed(0), 8));
				script = Crypto.util.bytesToHex(s.buffer);
			}

			$("#inputs .txIdScript:last").val(script);
		}
	}

	function listUnspentKomodo(redeem) {
		
	}

	/* retrieve unspent data from cryptoid for pandacoin */
	function listUnspentPandacoin(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/pnd/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/pnd/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}
	function listUnspentHtmlCoin(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/html/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/html/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}
	/* retrieve unspent data from cryptoid for dimecoin */
	function listUnspentPandacoin(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/dime/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/pnd/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}
	function listUnspentPeerCoin(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/ppc/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/ppc/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}
	function listUnspentMintCoin(redeem) {

	}
	/* retrieve unspent data from 1x2 coin block explorer */
	function listUnspent1x2(redeem) {

	}
	/* retrieve unspent data from 2x2 block explorer */
	function listUnspent2x2(redeem) {

	}
	/* retrieve unspent data from 2Give block explorer */
	function listUnspent2Give(redeem) {

	}
	/* retrieve unspent data from 2Give block explorer */
	function listUnspent404(redeem) {

	}
	/* retrieve unspent data from 42-coin block explorer */
	function listUnspent42Coin(redeemo) {

	}
	function listUnspentAbbc(redeemo) {

	}
	function listUnspentActinium(redeem) {

	}
	function listUnspentAdeptio(redeem) {

	}
	function listUnspentAegeus(redeem) {

	}
	function listUnspentAiasCoin(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/aias/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/aias/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	function listUnspentAlexandrite(redeem) {
				$.ajax ({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/coinexplorer/listunspent/alex/${redeem.addr}`,
						dataType: "json",
						error: function(data) {
								$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
						},
						beforeSend: function(data) {
							$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> WARNING: List Unspent can take sometime please be patient.');
						},
						success: function(data) {
										$("#redeemFromStatus").addClass('hidden');
										$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from Explorer: <a href="https://www.coinexplorer.net/dev/" target="_blank">CoinExplorer: DeviantCoin</a> Address: <a href="https://www.coinexplorer.net/alex/address/'+ redeem.addr +'" target="_blank">'+redeem.addr+'</a>');
												data.forEach(val => {
														var o = val;
														var tx = ((""+JSON.parse(o).result.txid).match(/.{1,2}/g).reverse()).join("")+'';
														var vout = JSON.parse(o).result.vout;
														vout.forEach(vo => {
															var v = vo;
															if(v.scriptPubKey === "nonstandard") {

															} else {
															v.scriptPubKey.addresses.forEach(addr => {
																	if (addr === redeem.addr) {
																		v.scriptPubKey.addresses.some(addr => addr === redeem.addr)
																		n = v.n;
																		script = (redeem.isMultisig==true) ? $("#redeemFrom").val() : v.scriptPubKey.hex;
																		amount = v.value;
																		addOutput(tx, n, script, amount);
																}
															});
														}
														});
												});
						},
						complete: function(data, status) {
								$("#redeemFromBtn").html("Load").attr('disabled',false);
								totalInputAmount();
						}
		});
	}

	function listUnspentAquariusCoin(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/arco/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/arco/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	function listUnspentArepaCoin(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/arepa/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/arepa/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	function listUnspentArgentum(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/ari/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/arepa/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	function listUnspentAricoin(redeem) {

	}
	function listUnspentAsiacoin(redeem) {

	}

	function listUnspentAudioCoin(reedem) {

	}
		/* Bitcoin function to retreive unspent outputs*/
	function listUnspentDefault(redeem) {
		var tx = coinjs.transaction($("#coinjs_utxo option:selected").val());
		tx.listUnspent(redeem.addr, function(data) {
			if(redeem.addr) {
				$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');

				$.each($(data).find("unspent").children(), function(i,o) {
					var tx = $(o).find("tx_hash").text();
					var n = $(o).find("tx_output_n").text();
					var script = (redeem.redeemscript==true) ? redeem.decodedRs : $(o).find("script").text();
					var amount = (($(o).find("value").text()*1)/100000000).toFixed(8);

					addOutput(tx, n, script, amount);
				});
			}

			$("#redeemFromBtn").html("Load").attr('disabled',false);
			totalInputAmount();

			mediatorPayment(redeem);
		});
	}

	/* retrieve unspent data from cryptoid for pandacoin */
	function listUnspentBlocknet(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/block/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/block/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	/* retrieve unspent data from cryptoid for cypherfunk */
	function listUnspentcypherfunk(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/funk/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/funk/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	/* retrieve unspent data from cryptoid for dash */
	function listUnspentDash(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/dash/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/dash/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	/* retrieve DeviantCoin unspent data from CoinExplorer */
	function listUnspentDeviantCoin(redeem) {
				$.ajax ({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/coinexplorer/listunspent/dev/${redeem.addr}`,
						dataType: "json",
						error: function(data) {
								$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
						},
						beforeSend: function(data) {
							$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> WARNING: List Unspent can take sometime please be patient.');
						},
						success: function(data) {
										$("#redeemFromStatus").addClass('hidden');
										$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from Explorer: <a href="https://www.coinexplorer.net/dev/" target="_blank">CoinExplorer: DeviantCoin</a> Address: <a href="https://www.coinexplorer.net/dev/address/'+ redeem.addr +'" target="_blank">'+redeem.addr+'</a>');
												data.forEach(val => {
														var o = val;
														var tx = ((""+JSON.parse(o).result.txid).match(/.{1,2}/g).reverse()).join("")+'';
														var vout = JSON.parse(o).result.vout;
														vout.forEach(vo => {
															var v = vo;
															if(v.scriptPubKey === "nonstandard") {

															} else {
															v.scriptPubKey.addresses.forEach(addr => {
																	if (addr === redeem.addr) {
																		v.scriptPubKey.addresses.some(addr => addr === redeem.addr)
																		n = v.n;
																		script = (redeem.isMultisig==true) ? $("#redeemFrom").val() : v.scriptPubKey.hex;
																		amount = v.value;
																		addOutput(tx, n, script, amount);
																}
															});
														}
														});
												});
						},
						complete: function(data, status) {
								$("#redeemFromBtn").html("Load").attr('disabled',false);
								totalInputAmount();
						}
		});
	}

	/* retrieve unspent data from cryptoid for pandacoin */
	function listUnspentDigiByte(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/dgb/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/pnd/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	/* retrieve unspent data from chainso */
	function listUnspentChainso(redeem, network) {
		$.ajax ({
			type: "GET",
			url: "https://api.cryptodepot.org/chainso/listunspent/"+network+"/"+redeem.addr, // fix me
			dataType: "json",
			error: function(data) {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
			},
			success: function(data) {
				if((data.status && data.data) && data.status=='success') {
					$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
					for(var i in data.data.txs) {
						var o = data.data.txs[i];
						var tx = ((""+o.txid).match(/.{1,2}/g).reverse()).join("")+'';
						if(tx.match(/^[a-f0-9]+$/)) {
							var n = o.output_no;
							var script = (redeem.redeemscript==true) ? redeem.decodedRs : o.script_hex;
							var amount = o.value;
							addOutput(tx, n, script, amount);
						}
					}
				} else {
					$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
				}
			},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	/* retrieve unspent data from cryptoid for pandacoin */
	function listUnspentElite(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/1337/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/pnd/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	/* retrieve unspent data from cryptoid for lynx */
	function listUnspentLynx(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/lynx/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/lynx/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	/* retrieve unspent data from MouseMN block explorer */
	function listUnspentMouseMN(redeem) {

	}

	function listUnspentInfiniteRick(redeem) {

	}

	function listUnspentAuroraCoin(redeem) {
		$.ajax ({
      type: "GET",
      url: "https://"+ multiWalletApiDomain +"/auroracoin/listunspent/"+redeem.addr+"",
      dataType: "json",
      error: function(data) {
        $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
      },
      success: function(data) {
        if(data && data.length) {
          $("#redeemFromAddress").removeClass('hidden').html(
            '<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="http://insight.auroracoin.is//address/'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
            data.slice(0, 100).forEach(function (o) {
              var script = redeem.isMultisig ? $("#redeemFrom").val() : o.scriptPubKey;
              addOutput(o.txid, o.vout, script, o.amount);
            })
        } else {
          $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
        }
      },
      complete: function(data, status) {
        $("#redeemFromBtn").html("Load").attr('disabled',false);
        totalInputAmount();
      }
    });
	}
	function listUnspentAxe(redeem) {
		$.ajax ({
      type: "GET",
      url: "https://"+ multiWalletApiDomain +"/axecore/listunspent/"+redeem.addr+"",
      dataType: "json",
      error: function(data) {
        $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
      },
      success: function(data) {
        if(data && data.length) {
          $("#redeemFromAddress").removeClass('hidden').html(
            '<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://insight.axecore.net/tx/'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
            data.slice(0, 100).forEach(function (o) {
              var script = redeem.isMultisig ? $("#redeemFrom").val() : o.scriptPubKey;
              addOutput(o.txid, o.vout, script, o.amount);
            })
        } else {
          $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
        }
      },
      complete: function(data, status) {
        $("#redeemFromBtn").html("Load").attr('disabled',false);
        totalInputAmount();
      }
    });
	}
	function listUnspentPirateChain(redeem) {
		$.ajax ({
      type: "GET",
      url: "https://"+ multiWalletApiDomain +"/piratechain/listunspent/"+redeem.addr+"",
      dataType: "json",
      error: function(data) {
        $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
      },
      success: function(data) {
        if(data && data.length) {
          $("#redeemFromAddress").removeClass('hidden').html(
            '<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://explorer.pirate.black/address/'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
            data.slice(0, 100).forEach(function (o) {
              var script = redeem.isMultisig ? $("#redeemFrom").val() : o.scriptPubKey;
              addOutput(o.txid, o.vout, script, o.amount);
            })
        } else {
          $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
        }
      },
      complete: function(data, status) {
        $("#redeemFromBtn").html("Load").attr('disabled',false);
        totalInputAmount();
      }
    });
	}
	/* retrieve unspent data from qtum block explorer */
	function listUnspentqtum(redeem) {
    $.ajax ({
      type: "GET",
      url: "https://"+ multiWalletApiDomain +"/qtum/listunspent/"+redeem.addr+"",
      dataType: "json",
      error: function(data) {
        $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
      },
      success: function(data) {
        if(data && data.length) {
          $("#redeemFromAddress").removeClass('hidden').html(
            '<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://explorer.qtum.org/address/'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
            data.slice(0, 100).forEach(function (o) {
              var script = redeem.isMultisig ? $("#redeemFrom").val() : o.scriptPubKey;
              addOutput(o.txid, o.vout, script, o.amount);
            })
        } else {
          $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
        }
      },
      complete: function(data, status) {
        $("#redeemFromBtn").html("Load").attr('disabled',false);
        totalInputAmount();
      }
    });
  }

	/* retrieve unspent data from cryptoid for syscoin */
	function listUnspentsyscoin(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/sys/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/lynx/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	function listUnspentuTip(redeem) {
		$.ajax ({
			type: "GET",
			url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/utip/"+ redeem.addr,
			dataType: "json",
			error: function() {
				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
			},
			success: function(data) {
									$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/lynx/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
								data.unspent_outputs.forEach(function(item, i) {
									if (i > 100) return;
										var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
										var tx_ouput_n = item.tx_ouput_n;
										var value = item.value /100000000;
										var confirms = item.confirmations;
										var script = item.script;
										var addr = item.addr;
										addOutput(tx_hash, tx_ouput_n, script, value);
										});
								},
			complete: function(data, status) {
				$("#redeemFromBtn").html("Load").attr('disabled',false);
				totalInputAmount();
			}
		});
	}

	 /* retrieve unspent data from viacoin explorer */
	function listUnspentviacoin(redeem) {
    $.ajax ({
      type: "GET",
      url: "https://"+ multiWalletApiDomain +"/viacoin/listunspent/"+redeem.addr+"",
      dataType: "json",
      error: function(data) {
        $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
      },
      success: function(data) {
        if(data && data.length) {
          $("#redeemFromAddress").removeClass('hidden').html(
            '<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://explorer.viacoin.org/address/'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
						data.slice(0, 100).forEach(function (o) {
              var script = redeem.isMultisig ? $("#redeemFrom").val() : o.scriptPubKey;
              addOutput(o.txid, o.vout, script, o.amount);
            })
        } else {
          $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
        }
      },
      complete: function(data, status) {
        $("#redeemFromBtn").html("Load").attr('disabled',false);
        totalInputAmount();
      }
    });
  }

function listUnspentZeitCoin(redeem) {
	$.ajax ({
		type: "GET",
		url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/zeit/"+ redeem.addr,
		dataType: "json",
		error: function() {
			$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
		},
		success: function(data) {
								$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/zeit/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
							data.unspent_outputs.forEach(function(item, i) {
								if (i > 100) return;
									var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
									var tx_ouput_n = item.tx_ouput_n;
									var value = item.value /100000000;
									var confirms = item.confirmations;
									var script = item.script;
									var addr = item.addr;
									addOutput(tx_hash, tx_ouput_n, script, value);
									});
							},
		complete: function(data, status) {
			$("#redeemFromBtn").html("Load").attr('disabled',false);
			totalInputAmount();
		}
	});
}

function listUnspentMoonCoin(redeem) {
	$.ajax ({
		type: "GET",
		url: "https://"+ multiWalletApiDomain +"/chainz/listunspent/moon/"+ redeem.addr,
		dataType: "json",
		error: function() {
			$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! pnd test function error');
		},
		success: function(data) {
								$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="https://chainz.cryptoid.info/zeit/address.dws?'+redeem.addr+'" target="_blank">'+redeem.addr+'</a>');
							data.unspent_outputs.forEach(function(item, i) {
								if (i > 100) return;
									var tx_hash = ((""+item.tx_hash).match(/.{1,2}/g).reverse()).join("")+'';
									var tx_ouput_n = item.tx_ouput_n;
									var value = item.value /100000000;
									var confirms = item.confirmations;
									var script = item.script;
									var addr = item.addr;
									addOutput(tx_hash, tx_ouput_n, script, value);
									});
							},
		complete: function(data, status) {
			$("#redeemFromBtn").html("Load").attr('disabled',false);
			totalInputAmount();
		}
	});
}

	/* math to calculate the inputs and outputs */

	function totalInputAmount() {
		$("#totalInput").html('0.00');
		$.each($("#inputs .txIdAmount"), function(i,o) {
			if(isNaN($(o).val())) {
				$(o).parent().addClass('has-error');
			} else {
				$(o).parent().removeClass('has-error');
				var f = 0;
				if(!isNaN($(o).val())) {
					f += $(o).val()*1;
				}
				$("#totalInput").html((($("#totalInput").html()*1) + (f*1)).toFixed(8));
			}
		});
		totalFee();
	}

	function validateOutputAmount() {
		$("#recipients .amount").unbind('');
		$("#recipients .amount").keyup(function() {
			if(isNaN($(this).val())) {
				$(this).parent().addClass('has-error');
			} else {
				$(this).parent().removeClass('has-error');
				var f = 0;
				$.each($("#recipients .amount"),function(i,o) {
					if(!isNaN($(o).val())) {
						f += $(o).val()*1;
					}
				});
				$("#totalOutput").html((f).toFixed(8));
			}
			totalFee();
		}).keyup();
	}

	function totalFee() {
		var fee = (($("#totalInput").html()*1) - ($("#totalOutput").html()*1)).toFixed(8);
		$("#transactionFee").val((fee>0)?fee:'0.00');
	}

	$(".optionsCollapse").click(function() {
		if($(".optionsAdvanced",$(this).parent()).hasClass('hidden')) {
			$(".glyphcollapse",$(this).parent()).removeClass('glyphicon-collapse-down').addClass('glyphicon-collapse-up');
			$(".optionsAdvanced",$(this).parent()).removeClass("hidden");
		} else {
			$(".glyphcollapse",$(this).parent()).removeClass('glyphicon-collapse-up').addClass('glyphicon-collapse-down');
			$(".optionsAdvanced",$(this).parent()).addClass("hidden");
		}
	});

	// broadcast transaction via coinbin (default)
	function rawSubmitDefault(btn) {
		var thisbtn = btn;
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		$.ajax ({
			type: "POST",
			url: coinjs.host+'?uid='+coinjs.uid+'&key='+coinjs.key+'&setmodule=bitcoin&request=sendrawtransaction', // fix me
			data: {'rawtx':$("#rawTransaction").val()},
			dataType: "xml",
			error: function(data) {
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(" There was an error submitting your request, please try again").prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			},
                        success: function(data) {
				$("#rawTransactionStatus").html(unescape($(data).find("response").text()).replace(/\+/g,' ')).removeClass('hidden');
				if($(data).find("result").text()==1) {
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' TXID: ' + $(data).find("txid").text() + '<br> <a href="https://coinb.in/tx/' + $(data).find("txid").text() + '" target="_blank">View on Blockchain</a>');
				} else {
					$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span> ');
				}
			},
			complete: function(data, status) {
				$("#rawTransactionStatus").fadeOut().fadeIn();
				$(thisbtn).val('Submit').attr('disabled',false);
			}
		});
	}

	// broadcast transaction via DigiByte Network
	function rawSubmitDigiByte(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/digibyte/broadcast/${txhex}`,
						data: $("#rawTransaction").val(),
						error: function(data) {
							if(data.responseText ==="There was an error. Check your console.") {
							errcode = data.responseText;
							var r = ' Failed to Broadcast.'; // this wants a preceding space
							$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						} else {
							var txid = data.responseText;
								$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: ${txid} <br> <a href="https://chainz.cryptoid.info/dgb/tx.dws?${txid}" target="_BLANK"> View on Block Explorer </a>`);
						}
						},
						success: function(data) {
								if(data) {
										var txid = data;  // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: ${txid} <br> <a href="https://chainz.cryptoid.info/dgb/tx.dws?${txid}" target="_BLANK"> View on Block Explorer </a>`);
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
		/*
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		$.ajax ({
			type: "POST",
			url: "https://digiexplorer.info/api/tx/send", // fixme
      data: JSON.stringify({ "rawtx": $("#rawTransaction").val() }),
			dataType : "json",
			contentType: "application/json",
      error: function(data) {
				var obj = data.responseText;
				var r = ' ';
				r += (obj) ? ' '+obj : '';
				r = (r!='') ? r : ' Failed to broadcast'; // build response
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			},
			success: function(data) {
				if(data) {
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' Txid: ' + data.txid);
				} else {
					$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				}
			},
			complete: function(data, status) {
				$("#rawTransactionStatus").fadeOut().fadeIn();
				$(thisbtn).val('Submit').attr('disabled',false);
			}
		}); */
	}

	// broadcast transaction via Cypherfunk Network (default)
	function rawSubmitCypherFunk(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/cypherfunk/broadcast/${txhex}`,
						data: $("#rawTransaction").val(),
						error: function(data) {
							if(data.responseText ==="There was an error. Check your console.") {
							errcode = data.responseText;
							var r = ' Failed to Broadcast.'; // this wants a preceding space
							$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						} else {
							var txid = data.responseText;
								$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: ${txid} <br> <a href="https://chainz.cryptoid.info/Cypherfunk/tx.dws?${txid}" target="_BLANK"> View on Block Explorer </a>`);
						}
						},
						success: function(data) {
								if(data) {
										var txid = data;  // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: ${txid} <br> <a href="https://chainz.cryptoid.info/funk/tx.dws?${txid}" target="_BLANK"> View on Block Explorer </a>`);
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
		/*
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		$.ajax ({
			type: "POST",
			url: "https://chainz.cryptoid.info/funk/api.dws?q=pushtx", // fix me Api Created
			data: $("#rawTransaction").val(),
			error: function(obj) {
				var obj1 = obj.responseText;
				var r = ' ';
				r += (obj1) ? ' '+obj1 : '';
				r = (r!='') ? r : ' Failed to broadcast'; // build response
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			},
			success: function(obj) {
				if(obj) {
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' Txid: ' + obj);
				} else {
					$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				}
			},
			complete: function(obj, status) {
				$("#rawTransactionStatus").fadeOut().fadeIn();
				$(thisbtn).val('Submit').attr('disabled',false);
			}
		}); */
		}

	// broadcast transaction via Blocknet blockchain
	function rawSubmitBlocknet(thisbtn) {
        $(thisbtn).val('Please wait, loading...').attr('disabled',true);
        txhex = $("#rawTransaction").val().trim();
            $.ajax({
                type: "GET",
                url: `https://`+ multiWalletApiDomain +`/block/broadcast/${txhex}`,
                data: $("#rawTransaction").val(),
                error: function(data) {
                  if(data.responseText ==="There was an error. Check your console.") {
                  errcode = data.responseText;
                  var r = ' Failed to Broadcast.'; // this wants a preceding space
                  $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                } else {
                  var txid = data.responseText;
                    $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: ${txid} <br> <a href="https://chainz.cryptoid.info/block/tx.dws?${txid}" target="_BLANK"> View on Block Explorer </a>`);
                }
                },
                success: function(data) {
                    if(data) {
                        var txid = data;  // is this right?
                        $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: ${txid} <br> <a href="https://chainz.cryptoid.info/block/tx.dws?${txid}" target="_BLANK"> View on Block Explorer </a>`);
                    } else {
                        $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                    }
                },
                complete: function (data, status) {
                    $("#rawTransactionStatus").fadeOut().fadeIn();
                    $(thisbtn).val('Submit').attr('disabled',false);
                }
            });
}

	// broadcast transaction via chain.so (mainnet)
	function rawSubmitChainso(thisbtn, network) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/chainso/broadcast/${network}/${txhex}`,
						error: function(data) {
							if(data) {
									var txid = data; // is this right?
									$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' TXID: ' + txid.responseText + '<br> <a href="https://chain.so/tx/'+network+'/' + txid.responseText + '" target="_blank">View on Blockchain Explorer</a>');
							} else {
									$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
							}
					},
						success: function(data) {
								if(data) {
										var txid = data; // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' TXID: ' + txid.responseText + '<br> <a href="https://chain.so/tx/'+network+'/' + txid.responseText + '" target="_blank">View on Blockchain Explorer</a>');
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
		/* $(thisbtn).val('Please wait, loading...').attr('disabled',true);
		$.ajax ({
			type: "POST",
			url: "https://chain.so/api/v2/send_tx/"+network+"/", // Fix me
			data: {"tx_hex":$("#rawTransaction").val()},
			dataType: "json",
			error: function(data) {
				var obj = $.parseJSON(data.responseText);
				var r = ' ';
				r += (obj.data.tx_hex) ? obj.data.tx_hex : '';
				r = (r!='') ? r : ' Failed to broadcast'; // build response
				$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
			},
      success: function(data) {
				if(data.status && data.data.txid) {
					$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' TXID: ' + data.data.txid + '<br> <a href="https://chain.so/tx/'+network+'/' + data.data.txid + '" target="_blank">View on Blockchain Explorer</a>');
				} else {
					$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
				}
			},
			complete: function(data, status) {
				$("#rawTransactionStatus").fadeOut().fadeIn();
				$(thisbtn).val('Submit').attr('disabled',false);
			}
		}); */
	}

	// broadcast transaction via Pandacoin blockchain
	function rawSubmitKomodo(thisbtn) {

	}
	function rawSubmitpandacoin(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/pandacoin/sendrawtransaction?hex=${txhex}`,
						error: function(data) {
								var r = ' Failed to Broadcast.'; // this wants a preceding space
								$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						},
						success: function(data) {
								if(data) {
										var txid = data; // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' Txid: ' + txid + '</a><br> <a href="https://chainz.cryptoid.info/pnd/tx.dws?'+ txid +'" target="_BLANK">View on Explorer</a>');
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
	}
	function rawSubmitHtmlCoin(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/htmlcoin/sendrawtransaction?hex=${txhex}`,
						error: function(data) {
								var r = ' Failed to Broadcast.'; // this wants a preceding space
								$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						},
						success: function(data) {
								if(data) {
										var txid = data; // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' Txid: ' + txid + '</a><br> <a href="https://chainz.cryptoid.info/html/tx.dws?'+ txid +'" target="_BLANK">View on Explorer</a>');
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
	}
	function rawSubmitDimeCoin(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/dimecoin/sendrawtransaction?hex=${txhex}`,
						error: function(data) {
								var r = ' Failed to Broadcast.'; // this wants a preceding space
								$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						},
						success: function(data) {
								if(data) {
										var txid = data; // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' Txid: ' + txid + '</a><br> <a href="https://chainz.cryptoid.info/pnd/tx.dws?'+ txid +'" target="_BLANK">View on Explorer</a>');
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
	}
	// broadcast transaction via Pandacoin blockchain
	function rawSubmitDogeCoin(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/dogecoin/broadcast/${txhex}`,
						error: function(data) {
								var r = ' Failed to Broadcast.'; // this wants a preceding space
								$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						},
						success: function(data) {
								if(data) {
										var txid = data; // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' Txid: ' + txid + '</a><br> <a href="https://chainz.cryptoid.info/pnd/tx.dws?'+ txid +'" target="_BLANK">View on Explorer</a>');
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
	}
	function rawSubmitPeerCoin(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/peercoin/sendrawtransaction?hex=${txhex}`,
						error: function(data) {
								var r = ' Failed to Broadcast.'; // this wants a preceding space
								$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						},
						success: function(data) {
								if(data) {
										var txid = data; // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(' Txid: ' + txid + '</a><br> <a href="https://chainz.cryptoid.info/ppc/tx.dws?'+ txid +'" target="_BLANK">View on Explorer</a>');
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
	}
	function rawSubmitMintCoin(thisbtn) {

	}
	//broadcast transaction via infinitericks Blockchain
	function rawSubmitInfiniteRick(thisbtn) {

	}
	function rawSubmitAricoin(thisbtn) {

	}
	function rawSubmitMouseMN(thisbtn) {

	}
	function rawSubmitAuroraCoin(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/auroracoin/broadcast/${txhex}`,
						error: function(data) {
								errcode = data.responseText;
								var r = ' Failed to Broadcast.'; // this wants a preceding space
								$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						},
						success: function(data) {
								if(data) {
										var txid = data.txid;  // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: <a href="http://insight.auroracoin.is/tx/${txid}"> ${txid} </a>`);
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
	}
	function rawsubmitAxe(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/axecore/broadcast/${txhex}`,
						error: function(data) {
								errcode = data.responseText;
								var r = ' Failed to Broadcast.'; // this wants a preceding space
								$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						},
						success: function(data) {
								if(data) {
										var txid = data.txid;  // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: <a href="https://insight.axecore.net/tx/${txid}"> ${txid} </a>`);
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
	}
	function rawsubmitPirateChain(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/piratechain/broadcast/${txhex}`,
						error: function(data) {
								errcode = data.responseText;
								var r = ' Failed to Broadcast.'; // this wants a preceding space
								$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						},
						success: function(data) {
								if(data) {
										var txid = data.txid;  // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: <a href="https://explorer.pirate.black/tx/${txid}"> ${txid} </a>`);
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
	}
	function rawsubmitMoonCoin(thisbtn) {

	}
	function rawsubmituTip(thisbtn) {

	}
	//broadcast transaction via qtum Blockchain
	function rawSubmitqtum(thisbtn) {
        $(thisbtn).val('Please wait, loading...').attr('disabled',true);
        txhex = $("#rawTransaction").val().trim();
            $.ajax({
                type: "GET",
                url: `https://`+ multiWalletApiDomain +`/qtum/broadcast/${txhex}`,
                error: function(data) {
                    errcode = data.responseText;
                    var r = ' Failed to Broadcast.'; // this wants a preceding space
                    $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                },
                success: function(data) {
                    if(data) {
                        var txid = data.txid;  // is this right?
                        $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: <a href="https://explorer.qtum.org/tx/${txid}"> ${txid} </a>`);
                    } else {
                        $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                    }
                },
                complete: function (data, status) {
                    $("#rawTransactionStatus").fadeOut().fadeIn();
                    $(thisbtn).val('Submit').attr('disabled',false);
                }
            });
}

	// broadcast transaction via Lynx blockchain
	function rawSubmitlynx(thisbtn) {
        $(thisbtn).val('Please wait, loading...').attr('disabled',true);
        txhex = $("#rawTransaction").val().trim();
            $.ajax({
                type: "GET",
                url: `https://`+ multiWalletApiDomain +`/lynx/broadcast/${txhex}`,
                data: $("#rawTransaction").val(),
                error: function(data) {
                  if(data.responseText ==="There was an error. Check your console.") {
                  errcode = data.responseText;
                  var r = ' Failed to Broadcast.'; // this wants a preceding space
                  $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                } else {
                  var txid = data.responseText;
                    $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid:  ${txid} <br> <a href="https://chainz.cryptoid.info/lynx/tx.dws?${txid}" target="_blank">View on Block Explorer</a>`);
                }
                },
                success: function(data) {
                    if(data) {
                        var txid = data;  // is this right?
                        $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid:  ${txid} <br> <a href="https://chainz.cryptoid.info/lynx/tx.dws?${txid}" target="_blank">View on Block Explorer</a>`);
                    } else {
                        $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                    }
                },
                complete: function (data, status) {
                    $("#rawTransactionStatus").fadeOut().fadeIn();
                    $(thisbtn).val('Submit').attr('disabled',false);
                }
            });
}

// broadcast transaction via Lynx blockchain
function rawSubmitdash(thisbtn) {
			$(thisbtn).val('Please wait, loading...').attr('disabled',true);
			txhex = $("#rawTransaction").val().trim();
					$.ajax({
							type: "GET",
							url: `https://`+ multiWalletApiDomain +`/dash/broadcast/${txhex}`,
							data: $("#rawTransaction").val(),
							error: function(data) {
								if(data.responseText ==="There was an error. Check your console.") {
								errcode = data.responseText;
								var r = ' Failed to Broadcast.'; // this wants a preceding space
								$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
							} else {
								var txid = data.responseText;
									$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid:  ${txid} <br> <a href="https://chainz.cryptoid.info/dash/tx.dws?${txid}" target="_blank">View on Block Explorer</a>`);
							}
							},
							success: function(data) {
									if(data) {
											var txid = data;  // is this right?
											$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid:  ${txid} <br> <a href="https://chainz.cryptoid.info/dash/tx.dws?${txid}" target="_blank">View on Block Explorer</a>`);
									} else {
											$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
									}
							},
							complete: function (data, status) {
									$("#rawTransactionStatus").fadeOut().fadeIn();
									$(thisbtn).val('Submit').attr('disabled',false);
							}
					});
}
	// broadcast transaction via Syscoin blockchain
	function rawSubmitsyscoin(thisbtn) {
        $(thisbtn).val('Please wait, loading...').attr('disabled',true);
        txhex = $("#rawTransaction").val().trim();
            $.ajax({
                type: "GET",
                url: `https://`+ multiWalletApiDomain +`/syscoin/broadcast/${txhex}`,
                error: function(data) {
                    errcode = data.responseText;
                    var r = ' Failed to Broadcast.'; // this wants a preceding space
										if(data) {
                        var txid = data.responseText;  // is this right?
                        $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: ${txid} <br> <a href="https://chainz.cryptoid.info/sys/tx.dws?${txid}" target="_BLANK"> View on Block Explorer </a>`);
                    } else {
                        $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + 'Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                    }
                },
                success: function(data) {
                    if(data) {
                        var txid = data.responseText;  // is this right?
                        $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: ${txid} <br> <a href="https://chainz.cryptoid.info/sys/tx.dws?${txid}" target="_BLANK"> View on Block Explorer </a>`);
                    } else {
                        $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
                    }
                },
                complete: function (data, status) {
                    $("#rawTransactionStatus").fadeOut().fadeIn();
                    $(thisbtn).val('Submit').attr('disabled',false);
                }
            });
}

	// broadcast transaction via Viacoin blockchain
	function rawSubmitViacoin(thisbtn) {
	        $(thisbtn).val('Please wait, loading...').attr('disabled',true);
	        txhex = $("#rawTransaction").val().trim();
	            $.ajax({
	                type: "GET",
	                url: `https://`+ multiWalletApiDomain +`/viacoin/broadcast/${txhex}`,
	                error: function(data) {
	                    errcode = data.responseText;
	                    var r = ' Failed to Broadcast.'; // this wants a preceding space
	                    $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
	                },
	                success: function(data) {
	                    if(data) {
	                        var txid = data.txid;  // is this right?
	                        $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: <a href="https://explorer.viacoin.org/tx/${txid}"> ${txid} </a>`);
	                    } else {
	                        $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
	                    }
	                },
	                complete: function (data, status) {
	                    $("#rawTransactionStatus").fadeOut().fadeIn();
	                    $(thisbtn).val('Submit').attr('disabled',false);
	                }
	            });
	}
	// broadcast transaction via DeviantCoin Blockchain
	function rawSubmitDeviantCoin(thisbtn) {
	        $(thisbtn).val('Please wait, loading...').attr('disabled',true);
	        txhex = $("#rawTransaction").val().trim();
	            $.ajax({
	                type: "GET",
	                url: `https://`+ multiWalletApiDomain +`/deviantcoin/broadcast/${txhex}`,
	                data: $("#rawTransaction").val(),
	                error: function(data) {
	                  if(data.responseText ==="There was an error. Check your console.") {
	                  errcode = data.responseText;
	                  var r = ' Failed to Broadcast.'; // this wants a preceding space
	                  $("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
	                } else {
	                  var txid = data.responseText;
	                  $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: ${txid} <br> <a href="https://www.coinexplorer.net/DEV/transaction/${txid}" target="_blank"> View on CoinExplorer</a>`);
	                }
	                },
	                success: function(data) {
	                        var txid = data;  // is this right?
	                        $("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid: <a href="https://www.coinexplorer.net/DEV/transaction/${txid}"> ${txid} </a>`);
	                },
	                complete: function (data, status) {
	                    $("#rawTransactionStatus").fadeOut().fadeIn();
	                    $(thisbtn).val('Submit').attr('disabled',false);
	                }
	            });
	}

	// Broadcast transaction via Elite blockchain
	function rawSubmit1x2Coin(thisbtn) {

	}
	function rawSubmit2x2(thisbtn) {

	}
	function rawSubmit2Give(thisbtn) {

	}
	function rawSubmit404(thisbtn) {

	}
	function rawSubmit42Coin(thisbtn) {

	}
	function rawSubmitAbbc(thisbtn) {

	}
	function rawSubmitAsiaCoin(thisbtn) {

	}
	function rawSubmitActinuium(thisbtn) {

	}
	function rawSubmitAdeptio(thisbtn) {

	}
	function rawSubmitAegeus(thisbtn) {

	}
	function rawSubmitAiasCoin(thisbtn) {
		$(thisbtn).val('Please wait, loading...').attr('disabled',true);
		txhex = $("#rawTransaction").val().trim();
				$.ajax({
						type: "GET",
						url: `https://`+ multiWalletApiDomain +`/aiascoin/broadcast/${txhex}`,
						data: $("#rawTransaction").val(),
						error: function(data) {
							if(data.responseText ==="There was an error. Check your console.") {
							errcode = data.responseText;
							var r = ' Failed to Broadcast.'; // this wants a preceding space
							$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(r + " " + errcode).prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
						} else {
							var txid = data.responseText;
								$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid:  ${txid} <br> <a href="https://chainz.cryptoid.info/aias/tx.dws?${txid}" target="_blank">View on Block Explorer</a>`);
						}
						},
						success: function(data) {
								if(data) {
										var txid = data;  // is this right?
										$("#rawTransactionStatus").addClass('alert-success').removeClass('alert-danger').removeClass("hidden").html(` Txid:  ${txid} <br> <a href="https://chainz.cryptoid.info/aias/tx.dws?${txid}" target="_blank">View on Block Explorer</a>`);
								} else {
										$("#rawTransactionStatus").addClass('alert-danger').removeClass('alert-success').removeClass("hidden").html(' Unexpected error, please try again').prepend('<span class="glyphicon glyphicon-exclamation-sign"></span>');
								}
						},
						complete: function (data, status) {
								$("#rawTransactionStatus").fadeOut().fadeIn();
								$(thisbtn).val('Submit').attr('disabled',false);
						}
				});
	}
	function rawSubmitAlexandrite(thisbrn) {

	}
	function rawSubmitAquariusCoin(thisbtn) {

	}
	function rawSubmitArepaCoin(thisbtn) {

	}
	function rawSubmitZeitCoin(thisbtn) {

	}
	function rawsubmitArgentum(thisbtn) {

	}
	/* verify script code */

	$("#verifyBtn").click(function() {
		$(".verifyData").addClass("hidden");
		$("#verifyStatus").hide();
		if(!decodeRedeemScript()) {
			if(!decodeTransactionScript()) {
				if(!decodePrivKey()) {
					if(!decodePubKey()) {
						if(!decodeHDaddress()) {
							$("#verifyStatus").removeClass('hidden').fadeOut().fadeIn();
						}
					}
				}
			}
		}

	});

	function decodeRedeemScript() {
		var script = coinjs.script();
		var decode = script.decodeRedeemScript($("#verifyScript").val());
		if(decode) {
			$("#verifyRsDataMultisig").addClass('hidden');
			$("#verifyRsDataHodl").addClass('hidden');
			$("#verifyRsDataSegWit").addClass('hidden');
			$("#verifyRsData").addClass("hidden");


			if(decode.type == "multisig__") {
				$("#verifyRsDataMultisig .multisigAddress").val(decode['address']);
				$("#verifyRsDataMultisig .signaturesRequired").html(decode['signaturesRequired']);
				$("#verifyRsDataMultisig table tbody").html("");
				for(var i=0;i<decode.pubkeys.length;i++) {
					var pubkey = decode.pubkeys[i];
					var address = coinjs.pubkey2address(pubkey);
					$('<tr><td width="30%"><input type="text" class="form-control" value="'+address+'" readonly></td><td><input type="text" class="form-control" value="'+pubkey+'" readonly></td></tr>').appendTo("#verifyRsDataMultisig table tbody");
				}
				$("#verifyRsData").removeClass("hidden");
				$("#verifyRsDataMultisig").removeClass('hidden');
				$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());
				return true;
			} else if(decode.type == "segwit__") {
				$("#verifyRsData").removeClass("hidden");
				$("#verifyRsDataSegWit .segWitAddress").val(decode['address']);
				$("#verifyRsDataSegWit").removeClass('hidden');
				return true;
			} else if(decode.type == "hodl__") {
				var d = $("#verifyRsDataHodl .date").data("DateTimePicker");
				$("#verifyRsDataHodl .address").val(decode['address']);
				$("#verifyRsDataHodl .pubkey").val(coinjs.pubkey2address(decode['pubkey']));
				$("#verifyRsDataHodl .date").val(decode['checklocktimeverify'] >= 500000000? moment.unix(decode['checklocktimeverify']).format("MM/DD/YYYY HH:mm") : decode['checklocktimeverify']);
				$("#verifyRsData").removeClass("hidden");
				$("#verifyRsDataHodl").removeClass('hidden');
				$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());
				return true;
			}
		}
		return false;
	}

	function decodeTransactionScript() {
		var tx = coinjs.transaction($("#coinjs_utxo option:selected").val());
		try {
			var decode = tx.deserialize($("#verifyScript").val());
			$("#verifyTransactionData .transactionVersion").html(decode['version']);
			$("#verifyTransactionData .transactionSize").html(decode.size()+' <i>bytes</i>');
			$("#verifyTransactionData .transactionLockTime").html(decode['lock_time']);
			$("#verifyTransactionData .transactionRBF").hide();
			$("#verifyTransactionData .transactionSegWit").hide();
			if (decode.witness.length>=1) {
				$("#verifyTransactionData .transactionSegWit").show();
			}
			$("#verifyTransactionData").removeClass("hidden");
			$("#verifyTransactionData tbody").html("");

			var h = '';
			$.each(decode.ins, function(i,o) {
				var s = decode.extractScriptKey(i);
				h += '<tr>';
				h += '<td><input class="form-control" type="text" value="'+o.outpoint.hash+'" readonly></td>';
				h += '<td class="col-xs-1">'+o.outpoint.index+'</td>';
				h += '<td class="col-xs-2"><input class="form-control" type="text" value="'+Crypto.util.bytesToHex(o.script.buffer)+'" readonly></td>';
				h += '<td class="col-xs-1"> <span class="glyphicon glyphicon-'+((s.signed=='true' || (decode.witness[i] && decode.witness[i].length==2))?'ok':'remove')+'-circle"></span>';
				if(s['type']=='multisig' && s['signatures']>=1) {
					h += ' '+s['signatures'];
				}
				h += '</td>';
				h += '<td class="col-xs-1">';
				if(s['type']=='multisig') {
					var script = coinjs.script();
					var rs = script.decodeRedeemScript(s.script);
					h += rs['signaturesRequired']+' of '+rs['pubkeys'].length;
				} else {
					h += '<span class="glyphicon glyphicon-remove-circle"></span>';
				}
				h += '</td>';
				h += '</tr>';

				//debug
				if(parseInt(o.sequence)<(0xFFFFFFFF-1)) {
					$("#verifyTransactionData .transactionRBF").show();
				}
			});

			$(h).appendTo("#verifyTransactionData .ins tbody");

			h = '';
			$.each(decode.outs, function(i,o) {

				if(o.script.chunks.length==2 && o.script.chunks[0]==106) { // OP_RETURN

					var data = Crypto.util.bytesToHex(o.script.chunks[1]);
					var dataascii = hex2ascii(data);

					if(dataascii.match(/^[\s\d\w]+$/ig)) {
						data = dataascii;
					}

					h += '<tr>';
					h += '<td><input type="text" class="form-control" value="(OP_RETURN) '+data+'" readonly></td>';
					h += '<td class="col-xs-1">'+(o.value/100000000).toFixed(8)+'</td>';
					h += '<td class="col-xs-2"><input class="form-control" type="text" value="'+Crypto.util.bytesToHex(o.script.buffer)+'" readonly></td>';
					h += '</tr>';
				} else {

					var addr = '';
					if(o.script.chunks.length==5) {
						addr = coinjs.scripthash2address(Crypto.util.bytesToHex(o.script.chunks[2]));
					} else if((o.script.chunks.length==2) && o.script.chunks[0]==0) {
						addr = coinjs.bech32_encode(coinjs.bech32.hrp, [coinjs.bech32.version].concat(coinjs.bech32_convert(o.script.chunks[1], 8, 5, true)));
					} else {
						var pub = coinjs.pub;
						coinjs.pub = coinjs.multisig;
						addr = coinjs.scripthash2address(Crypto.util.bytesToHex(o.script.chunks[1]));
						coinjs.pub = pub;
					}

					h += '<tr>';
					h += '<td><input class="form-control" type="text" value="'+addr+'" readonly></td>';
					h += '<td class="col-xs-1">'+(o.value/100000000).toFixed(8)+'</td>';
					h += '<td class="col-xs-2"><input class="form-control" type="text" value="'+Crypto.util.bytesToHex(o.script.buffer)+'" readonly></td>';
					h += '</tr>';
				}
			});
			$(h).appendTo("#verifyTransactionData .outs tbody");

			$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());
			return true;
		} catch(e) {
			return false;
		}
	}

	function hex2ascii(hex) {
		var str = '';
		for (var i = 0; i < hex.length; i += 2)
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		return str;
	}

	function decodePrivKey() {
		var wif = $("#verifyScript").val();
		if(wif.length==51 || wif.length==52) {
			try {
				var w2address = coinjs.wif2address(wif);
				var w2pubkey = coinjs.wif2pubkey(wif);
				var w2privkey = coinjs.wif2privkey(wif);

				$("#verifyPrivKey .address").val(w2address['address']);
				$("#verifyPrivKey .pubkey").val(w2pubkey['pubkey']);
				$("#verifyPrivKey .privkey").val(w2privkey['privkey']);
				$("#verifyPrivKey .iscompressed").html(w2address['compressed']?'true':'false');

				$("#verifyPrivKey").removeClass("hidden");
				return true;
			} catch (e) {
				return false;
			}
		} else {
			return false;
		}
	}

	function decodePubKey() {
		var pubkey = $("#verifyScript").val();
		if(pubkey.length==66 || pubkey.length==130) {
			try {
				$("#verifyPubKey .verifyDataSw").addClass('hidden');
				$("#verifyPubKey .address").val(coinjs.pubkey2address(pubkey));
				if(pubkey.length == 66) {
					var sw = coinjs.segwitAddress(pubkey);
					$("#verifyPubKey .addressSegWit").val(sw.address);
					$("#verifyPubKey .addressSegWitRedeemScript").val(sw.redeemscript);

					var b32 = coinjs.bech32Address(pubkey);
					$("#verifyPubKey .addressBech32").val(b32.address);
					$("#verifyPubKey .addressBech32RedeemScript").val(b32.redeemscript);

					$("#verifyPubKey .verifyDataSw").removeClass('hidden');
				}
				$("#verifyPubKey").removeClass("hidden");
				$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());
				return true;
			} catch (e) {
				return false;
			}
		} else {
			return false;
		}
	}

	function decodeHDaddress() {
		coinjs.compressed = true;
		var s = $("#verifyScript").val();
		try {
			var hex = Crypto.util.bytesToHex((coinjs.base58decode(s)).slice(0,4));
			var hex_cmp_prv = Crypto.util.bytesToHex((coinjs.numToBytes(coinjs.hdkey.prv,4)).reverse());
			var hex_cmp_pub = Crypto.util.bytesToHex((coinjs.numToBytes(coinjs.hdkey.pub,4)).reverse());
			if(hex == hex_cmp_prv || hex == hex_cmp_pub) {
				var hd = coinjs.hd(s);
				$("#verifyHDaddress .hdKey").html(s);
				$("#verifyHDaddress .chain_code").val(Crypto.util.bytesToHex(hd.chain_code));
				$("#verifyHDaddress .depth").val(hd.depth);
				$("#verifyHDaddress .version").val('0x'+(hd.version).toString(16));
				$("#verifyHDaddress .child_index").val(hd.child_index);
				$("#verifyHDaddress .hdwifkey").val((hd.keys.wif)?hd.keys.wif:'');
				$("#verifyHDaddress .key_type").html((((hd.depth==0 && hd.child_index==0)?'Master':'Derived')+' '+hd.type).toLowerCase());
				$("#verifyHDaddress .parent_fingerprint").val(Crypto.util.bytesToHex(hd.parent_fingerprint));
				$("#verifyHDaddress .derived_data table tbody").html("");
				deriveHDaddress();
				$(".verifyLink").attr('href','?verify='+$("#verifyScript").val());
				$("#verifyHDaddress").removeClass("hidden");
				return true;
			}
		} catch (e) {
			return false;
		}
	}

	function deriveHDaddress() {
		var hd = coinjs.hd($("#verifyHDaddress .hdKey").html());
		var index_start = $("#verifyHDaddress .derivation_index_start").val()*1;
		var index_end = $("#verifyHDaddress .derivation_index_end").val()*1;
		var html = '';
		$("#verifyHDaddress .derived_data table tbody").html("");
		for(var i=index_start;i<=index_end;i++) {
			if($("#hdpathtype option:selected").val()=='simple') {
				var derived = hd.derive(i);
			} else {
				var derived = hd.derive_path(($("#hdpath input").val().replace(/\/+$/, ""))+'/'+i);
			}
			html += '<tr>';
			html += '<td>'+i+'</td>';
			html += '<td><input type="text" class="form-control" value="'+derived.keys.address+'" readonly></td>';
			html += '<td><input type="text" class="form-control" value="'+((derived.keys.wif)?derived.keys.wif:'')+'" readonly></td>';
			html += '<td><input type="text" class="form-control" value="'+derived.keys_extended.pubkey+'" readonly></td>';
			html += '<td><input type="text" class="form-control" value="'+((derived.keys_extended.privkey)?derived.keys_extended.privkey:'')+'" readonly></td>';
			html += '</tr>';
		}
		$(html).appendTo("#verifyHDaddress .derived_data table tbody");
	}


	$("#hdpathtype").change(function() {
		if($(this).val()=='simple') {
			$("#hdpath").removeClass().addClass("hidden");
		} else {
			$("#hdpath").removeClass();
		}
	});


	/* sign code */

	$("#signBtn").click(function() {
		var wifkey = $("#signPrivateKey");
		var script = $("#signTransaction");

		if(coinjs.addressDecode(wifkey.val())) {
			$(wifkey).parent().removeClass('has-error');
		} else {
			$(wifkey).parent().addClass('has-error');
		}

		if((script.val()).match(/^[a-f0-9]+$/ig)) {
			$(script).parent().removeClass('has-error');
		} else {
			$(script).parent().addClass('has-error');
		}

		if($("#sign .has-error").length==0) {
			$("#signedDataError").addClass('hidden');
			try {
				var tx = coinjs.transaction($("#coinjs_utxo option:selected").val());
				var t = tx.deserialize(script.val());

				var signed = t.sign(wifkey.val(), $("#sighashType option:selected").val());
				$("#signedData textarea").val(signed);
				$("#signedData .txSize").html(t.size());
				$("#signedData").removeClass('hidden').fadeIn();
			} catch(e) {
				// console.log(e);
			}
		} else {
			$("#signedDataError").removeClass('hidden');
			$("#signedData").addClass('hidden');
		}
	});

	$("#sighashType").change(function() {
		$("#sighashTypeInfo").html($("option:selected",this).attr('rel')).fadeOut().fadeIn();
	});

	$("#signAdvancedCollapse").click(function() {
		if($("#signAdvanced").hasClass('hidden')) {
			$("span",this).removeClass('glyphicon-collapse-down').addClass('glyphicon-collapse-up');
			$("#signAdvanced").removeClass("hidden");
		} else {
			$("span",this).removeClass('glyphicon-collapse-up').addClass('glyphicon-collapse-down');
			$("#signAdvanced").addClass("hidden");
		}
	});

	/* page load code */

	function _get(value) {
		var dataArray = (document.location.search).match(/(([a-z0-9\_\[\]]+\=[a-z0-9\_\.\%\@]+))/gi);
		var r = [];
		if(dataArray) {
			for(var x in dataArray) {
				if((dataArray[x]) && typeof(dataArray[x])=='string') {
					if((dataArray[x].split('=')[0].toLowerCase()).replace(/\[\]$/ig,'') == value.toLowerCase()) {
						r.push(unescape(dataArray[x].split('=')[1]));
					}
				}
			}
		}
		return r;
	}

	var _getBroadcast = _get("broadcast");
	if(_getBroadcast[0]) {
		$("#rawTransaction").val(_getBroadcast[0]);
		$("#rawSubmitBtn").click();
		window.location.hash = "#broadcast";
	}

	var _getVerify = _get("verify");
	if(_getVerify[0]) {
		$("#verifyScript").val(_getVerify[0]);
		$("#verifyBtn").click();
		window.location.hash = "#verify";
	}

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if(e.target.hash == "#fees") {
			feeStats();
		}
	})

	$(".qrcodeBtn").click(function() {
		$("#qrcode").html("");
		var thisbtn = $(this).parent().parent();
		var qrstr = false;
		var ta = $("textarea",thisbtn);

		if(ta.length>0) {
			var w = (screen.availWidth > screen.availHeight ? screen.availWidth : screen.availHeight)/3;
			var qrcode = new QRCode("qrcode", {width:w, height:w});
			qrstr = $(ta).val();
			if(qrstr.length > 1024) {
				$("#qrcode").html("<p>Sorry the data is too long for the QR generator.</p>");
			}
		} else {
			var qrcode = new QRCode("qrcode");
			// QRCode Change
			if(host=='pandacoin_mainnet') {
				qrstr = "pandacoin:"+$('.address',thisbtn).val();
			} else if(host=='komodo_mainnet') {
				qrstr = "pandacoin:"+$('.address',thisbtn).val();
			} else if(host=='htmlcoin_mainnet') {
				qrstr = "htmlcoin:"+$('.address',thisbtn).val();
			} else if(host=='qtum_mainnet') {
				qrstr = "qtum:"+$('.address',thisbtn).val();
			} else if(host=='dimecoin_mainnet') {
				qrstr = "dimecoin:"+$('.address',thisbtn).val();
			} else if(host=='aricoin_mainnet') {
				qrstr = "aricoin:"+$('.address',thisbtn).val();
			} else if(host=='dogecoin_mainnet') {
				qrstr = "dogecoin:"+$('.address',thisbtn).val();
			} else if(host=='utip_mainnet') {
				qrstr = "utip:"+$('.address',thisbtn).val();
			} else if(host=='mooncoin_mainnet') {
				qrstr = "mooncoin:"+$('.address',thisbtn).val();
			} else if(host=='axe_mainnet') {
				qrstr = "axe:"+$('.address',thisbtn).val();
			} else if(host=='auroracoin_mainnet') {
				qrstr = "auroracoin:"+$('.address',thisbtn).val();
			} else if(host=='piratechain_mainnet') {
				qrstr = "piratechain:"+$('.address',thisbtn).val();
			} else {
				qrstr = "bitcoin:"+$('.address',thisbtn).val();
			}
		}

		if(qrstr) {
			qrcode.makeCode(qrstr);
		}
	});

	$('input[title!=""], abbr[title!=""]').tooltip({'placement':'bottom'});

	if (location.hash !== '') {
		$('a[href="' + location.hash + '"]').tab('show');
	}

	$(".showKey").click(function() {
		$("input[type='password']",$(this).parent().parent()).attr('type','text');
	});

	$("#homeBtn").click(function(e) {
		e.preventDefault();
		history.pushState(null, null, '#home');
		$("#header .active, #content .tab-content").removeClass("active");
		$("#home").addClass("active");
	});

	$('a[data-toggle="tab"]').on('click', function(e) {
		e.preventDefault();
		if(e.target && $(e.target).attr('href')) {
			history.pushState(null, null, '#'+$(e.target).attr('href').substr(1));
		}
	});

	window.addEventListener("popstate", function(e) {
		var activeTab = $('[href=' + location.hash + ']');
		if (activeTab.length) {
			activeTab.tab('show');
		} else {
			$('.nav-tabs a:first').tab('show');
		}
	});

	for(i=1;i<3;i++) {
		$(".pubkeyAdd").click();
	}

	validateOutputAmount();

	/* settings page code */

	$("#coinjs_pub").val('0x'+(coinjs.pub).toString(16));
	$("#coinjs_priv").val('0x'+(coinjs.priv).toString(16));
	$("#coinjs_multisig").val('0x'+(coinjs.multisig).toString(16));

	$("#coinjs_hdpub").val('0x'+(coinjs.hdkey.pub).toString(16));
	$("#coinjs_hdprv").val('0x'+(coinjs.hdkey.prv).toString(16));

	$("#settingsBtn").click(function() {
		var host = $("#coinjs_broadcast option:selected").val();
			// Visual Changes
		if(host=='pandacoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/pnd.png";
			document.getElementById("broadCastTitle").textContent = "Pandacoin";
			document.getElementById("walletTitle").textContent = "Pandacoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="pandacoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/pandacoin" target="_BLANK">Pandacoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `PND`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Pandacoin - Multi Wallet';
		} else if(host=='komodo_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/kmd.png";
			document.getElementById("broadCastTitle").textContent = "Komodo";
			document.getElementById("walletTitle").textContent = "Komodo";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="komodo" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/komodo" target="_BLANK">Komodo CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `KMD`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Komodo - Multi Wallet';
		} else if(host=='htmlcoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/html.png";
			document.getElementById("broadCastTitle").textContent = "HTMLCoin";
			document.getElementById("walletTitle").textContent = "HTMLCoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="htmlcoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/htmlcoin" target="_BLANK">HTMLCoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `HTML`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'HTMLCoin - Multi Wallet';
		} else if(host=='dimecoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/dime.png";
			document.getElementById("broadCastTitle").textContent = "Dimecoin";
			document.getElementById("walletTitle").textContent = "Dimecoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="dimecoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/dimecoin" target="_BLANK">Dimecoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `DIME`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Dimecoin - Multi Wallet';
		} else if(host=='peercoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/ppc.png";
			document.getElementById("broadCastTitle").textContent = "Peercoin";
			document.getElementById("walletTitle").textContent = "Peercoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="peercoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/peercoin" target="_BLANK">Peercoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `PPC`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Peercoin - Multi Wallet';
		} else if(host=='1x2coin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/1x2.png";
			document.getElementById("broadCastTitle").textContent = "1X2 Coin";
			document.getElementById("walletTitle").textContent = "1X2 Coin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="1x2-coin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/1x2-coin" target="_BLANK">1X2 Coin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `1x2`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = '1X2 Coin - Multi Wallet';
		} else if(host=='mintcoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/mint.png";
			document.getElementById("broadCastTitle").textContent = "Mintcoin";
			document.getElementById("walletTitle").textContent = "Mintcoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="mintcoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/mintcoin" target="_BLANK">Mintcoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `MINT`;
			document.getElementById("WalletSpendWarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Spending Transactions</h2></center>`;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Mintcoin - Multi Wallet';
		} else if(host=='2x2_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/2x2.png";
			document.getElementById("broadCastTitle").textContent = "2X2";
			document.getElementById("walletTitle").textContent = "2X2";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="2x2" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/2x2" target="_BLANK">2X2 CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `2x2`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = '2X2 - Multi Wallet';
		} else if(host=='mooncoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/moon.png";
			document.getElementById("broadCastTitle").textContent = "Mooncoin";
			document.getElementById("walletTitle").textContent = "Mooncoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="mooncoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/mooncoin" target="_BLANK">Moincoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `MOON`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Mooncoin - Multi Wallet';
		} else if(host=='2give_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/2give.png";
			document.getElementById("broadCastTitle").textContent = "2Give";
			document.getElementById("walletTitle").textContent = "2Give";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="2give" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/2give" target="_BLANK">2Give CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `2GIVE`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = '2Give - Multi Wallet';
		} else if(host=='404_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/404.jpg";
			document.getElementById("broadCastTitle").textContent = "404";
			document.getElementById("walletTitle").textContent = "404";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="alibabacoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/alibabacoin" target="_BLANK">404 CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `404`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = '404 - Multi Wallet';
		} else if(host=='42coin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/42.png";
			document.getElementById("broadCastTitle").textContent = "42-Coin";
			document.getElementById("walletTitle").textContent = "42-Coin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="42-coin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/42-coin" target="_BLANK">42-Coin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `42`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = '42-Coin - Multi Wallet';
		} else if(host=='axe_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/axe.png";
			document.getElementById("broadCastTitle").textContent = "Axe";
			document.getElementById("walletTitle").textContent = "Axe";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="axe" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/axe" target="_BLANK">Axe CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `AXE`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Axe - Multi Wallet';
		} else if(host=='piratechain_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/arrr.png";
			document.getElementById("broadCastTitle").textContent = "Pirate Chain";
			document.getElementById("walletTitle").textContent = "Pirate Chain";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="pirate-chain" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/pirate-chain" target="_BLANK">Pirate Chain CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ARRR`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Pirate Chain - Multi Wallet';
		} else if(host=='abbc_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/abbc.png";
			document.getElementById("broadCastTitle").textContent = "ABBC";
			document.getElementById("walletTitle").textContent = "ABBC";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="abbc" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/abbc" target="_BLANK">ABBC CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ABBC`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'ABBC - Multi Wallet';
		} else if(host=='actinium_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/acm.png";
			document.getElementById("broadCastTitle").textContent = "Actinium";
			document.getElementById("walletTitle").textContent = "Actinium";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="actinium" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/actinium" target="_BLANK">Actinium CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ACM`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Actinium - Multi Wallet';
		} else if(host=='adeptio_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/ade.png";
			document.getElementById("broadCastTitle").textContent = "Adeptio";
			document.getElementById("walletTitle").textContent = "Adeptio";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="adeptio" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/adeptio" target="_BLANK">Adeptio CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ADE`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Adeptio - Multi Wallet';
		} else if(host=='aegeus_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/aeg.png";
			document.getElementById("broadCastTitle").textContent = "Aegeus";
			document.getElementById("walletTitle").textContent = "Aegeus";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="aegeus" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/aegeus" target="_BLANK">Aegeus CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `AEG`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Aegeus - Multi Wallet';
		} else if(host=='aiascoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/aias.png";
			document.getElementById("broadCastTitle").textContent = "AIAScoin";
			document.getElementById("walletTitle").textContent = "AIAScoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="aiascoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/aiascoin" target="_BLANK">AIAScoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `AIAS`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'AIASCoin - Multi Wallet';
		} else if(host=='alexandrite_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/alex.png";
			document.getElementById("broadCastTitle").textContent = "Alexandrite";
			document.getElementById("walletTitle").textContent = "Alexandrite";
			document.getElementById("market-ticker").innerHTML = ``;
			document.getElementById("coingeckoinfo").innerHTML = ``;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ALEX`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Alexandrite - Multi Wallet';
		} else if(host=='aricoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/ari.png";
			document.getElementById("broadCastTitle").textContent = "Aricoin";
			document.getElementById("walletTitle").textContent = "Aricoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="aricoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/aricoin" target="_BLANK">Aricoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ARI`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Aricoin - Multi Wallet';
		} else if(host=='auroracoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/aur.png";
			document.getElementById("broadCastTitle").textContent = "Auroracoin";
			document.getElementById("walletTitle").textContent = "Auroracoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="auroracoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/auroracoin" target="_BLANK">Aricoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `AUR`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Auroracoin - Multi Wallet';
		} else if(host=='aquariuscoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/arco.png";
			document.getElementById("broadCastTitle").textContent = "AquariusCoin";
			document.getElementById("walletTitle").textContent = "AquariusCoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="aquariuscoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/aquariuscoin" target="_BLANK">AquariusCoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ARCO`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'AquariusCoin - Multi Wallet';
		} else if(host=='arepacoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/arepa.png";
			document.getElementById("broadCastTitle").textContent = "Arepacoin";
			document.getElementById("walletTitle").textContent = "Arepacoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="arepacoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/arepacoin" target="_BLANK">Arepacoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `AREPA`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Arepacoin - Multi Wallet';
		} else if(host=='argentum_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/arg.png";
			document.getElementById("broadCastTitle").textContent = "Argentum";
			document.getElementById("walletTitle").textContent = "Argentum";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="argentum" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/argentum" target="_BLANK">Argentum CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Tested for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ARG`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Argentum - Multi Wallet';
		} else if(host=='asiacoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/ac.png";
			document.getElementById("broadCastTitle").textContent = "Asiacoin";
			document.getElementById("walletTitle").textContent = "Asiacoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="asiacoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/asiacoin" target="_BLANK">Asiacoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `AC`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Asiacoin - Multi Wallet';
		} else if(host=='audiocoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/adc.png";
			document.getElementById("broadCastTitle").textContent = "Audiocoin";
			document.getElementById("walletTitle").textContent = "Audiocoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="audiocoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/audiocoin" target="_BLANK">Audiocoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ADC`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Audiocoin - Multi Wallet';
		} else if(host=='coinb.in') {
			document.getElementById("coinLogo").src = "images/logos/btc.png";
			document.getElementById("broadCastTitle").textContent = "Bitcoin";
			document.getElementById("walletTitle").textContent = "Bitcoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="bitcoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/bitcoin"  target="_BLANK">Bitcoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `BTC`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Bitcoin - Multi Wallet';
		} else if(host=='blocknet_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/block.png";
			document.getElementById("broadCastTitle").textContent = "Blocknet";
			document.getElementById("walletTitle").textContent = "Blocknet";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="blocknet" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/blocknet" target="_BLANK">Blocknet CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `BLOCK`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Blocknet - Multi Wallet';
		} else if(host=='cypherfunk_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/funk.png";
			document.getElementById("broadCastTitle").textContent = "The-Cypherfunks";
			document.getElementById("walletTitle").textContent = "The-Cypherfunks";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="the-cypherfunks" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/the-cypherfunks"  target="_BLANK">The-Cypherfunks CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `FUNK`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Cypherfunk - Multi Wallet';
		} else if(host=='dash_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/dash.png";
			document.getElementById("broadCastTitle").textContent = "Dash";
			document.getElementById("walletTitle").textContent = "Dash";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="dash" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/dash" target="_BLANK">Dash CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `DASH`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'DASH - Multi Wallet';
		} else if(host=='deviantcoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/dev.png";
			document.getElementById("broadCastTitle").textContent = "DeviantCoin";
			document.getElementById("walletTitle").textContent = "DeviantCoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="deviantcoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/deviantcoin" target="_BLANK">Deviantcoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `DEV`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'DeviantCoin - Multi Wallet';
		} else if(host=='digibyte_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/dgb.png";
			document.getElementById("broadCastTitle").textContent = "DigiByte";
			document.getElementById("walletTitle").textContent = "DigiByte";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="digibyte" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/digibyte" target="_BLANK">DigiByte CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `DGB`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'DigiByte - Multi Wallet';
		} else if(host=='dogecoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/dogecoin.png";
			document.getElementById("broadCastTitle").textContent = "Dogecoin";
			document.getElementById("walletTitle").textContent = "Dogecoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="dogecoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/dogecoin" target="_BLANK">Dogecoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `DOGE`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Dogecoin - Multi Wallet';
		} else if(host=='elite_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/1337.png";
			document.getElementById("broadCastTitle").textContent = "Elite Coin";
			document.getElementById("walletTitle").textContent = "Elite Coin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="elite" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/elite" target="_BLANK">Elite CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `1337`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Elite Coin - Multi Wallet';
		} else if(host=='litecoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/litecoin.png";
			document.getElementById("broadCastTitle").textContent = "Litecoin";
			document.getElementById("walletTitle").textContent = "Litecoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="litecoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/litecoin"  target="_BLANK">Litecoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `LTC`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
		} else if(host=='lynx_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/lynx.png";
			document.getElementById("broadCastTitle").textContent = "Lynx";
			document.getElementById("walletTitle").textContent = "Lynx";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="lynx" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/lynx" target="_BLANK">Lynx CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `LYNX`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Lynx - Multi Wallet';
		} else if(host=='mousecoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/mouse.png";
			document.getElementById("broadCastTitle").textContent = "MouseMN";
			document.getElementById("walletTitle").textContent = "MouseMN";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="mouse" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/mouse" target="_BLANK">MouseMN CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `MOUSE`;
			document.getElementById("WalletSpendWarning").innerHTML = `<center>This Coin has Not Yet Been Programmed For Spend</center>`;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'MouseMN - Multi Wallet';
		} else if(host=='infiniterick_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/rick.png";
			document.getElementById("broadCastTitle").textContent = "Infinite Ricks";
			document.getElementById("walletTitle").textContent = "Infinite Ricks";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="infinite-ricks" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/infinite-ricks" target="_BLANK">Infinite Ricks CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `RICK`;
			document.getElementById("WalletSpendWarning").innerHTML = `<center>This Coin has Not Yet Been Programmed For Spend</center>`;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Infinite Ricks - Multi Wallet';
		} else if(host=='qtum_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/qtum.png";
			document.getElementById("broadCastTitle").textContent = "Qtum";
			document.getElementById("walletTitle").textContent = "Qtum";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="qtum" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/qtum" target="_BLANK">Qtum CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `QTUM`;
			document.getElementById("WalletSpendWarning").innerHTML = `<center>This Coin has Not Yet Been Programmed For Spend</center>`;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Qtum - Multi Wallet';
		} else if(host=='syscoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/sys.png";
			document.getElementById("broadCastTitle").textContent = "Syscoin";
			document.getElementById("walletTitle").textContent = "Syscoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="syscoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/syscoin" target="_BLANK">Syscoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `SYS`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Syscoin - Multi Wallet';
		} else if(host=='utip_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/utip.png";
			document.getElementById("broadCastTitle").textContent = "uTip";
			document.getElementById("walletTitle").textContent = "uTip";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="utip" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/utip" target="_BLANK">uTip CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `UTIP`;
			document.getElementById("WalletSpendWarning").innerHTML = `<center>This Coin has Not Yet Been Programmed For Spend</center>`;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'uTip - Multi Wallet';
		} else if(host=='viacoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/via.png";
			document.getElementById("broadCastTitle").textContent = "Viacoin";
			document.getElementById("walletTitle").textContent = "Viacoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="viacoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/viacoin"  target="_BLANK">Viacoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `VIA`;
			document.getElementById("WalletSpendWarning").innerHTML = `<center>This Coin has Not Yet Been Programmed For Spend</center>`;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Viacoin - Multi Wallet';
		} else if(host=='zeitcoin_mainnet') {
			document.getElementById("coinLogo").src = "images/logos/zeit.png";
			document.getElementById("broadCastTitle").textContent = "Zeitcoin";
			document.getElementById("walletTitle").textContent = "Zeitcoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="zeitcoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/zeitcoin" target="_BLANK">Zeitcoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Creating Transactions</h2></center>`;
			document.getElementById("signwarning").innerHTML = `<center><h2>This Coin Has Not Yet Been Programmed for Signing Transactions</h2></center>`;
			document.getElementById("broadcastwarning").innerHTML = `<center><h2>This Coin has Not Yet Been Programmed For Broadcasting Transactions</h2></center>`;
			document.getElementById("spendTicker").innerHTML = `ZEIT`;
			document.getElementById("WalletSpendWarning").innerHTML = `<center>This Coin has Not Yet Been Programmed For Spend</center>`;
			document.getElementById("developerDonation").value = `1.0`;
			document.title = 'Zeitcoin - Multi Wallet';
		} /* else {
			document.getElementById("coinLogo").src = "images/logos/pnd.png";
			document.getElementById("broadCastTitle").textContent = "Pandacoin";
			document.getElementById("walletTitle").textContent = "Pandacoin";
			document.getElementById("market-ticker").innerHTML = `<coingecko-coin-market-ticker-list-widget  coin-id="pandacoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>`;
			document.getElementById("coingeckoinfo").innerHTML = `<center><a href="https://www.coingecko.com/en/coins/pandacoin"  target="_BLANK">Pandacoin CoinGecko Info</a></center>`;
			document.getElementById("transwarning").innerHTML = ``;
			document.getElementById("signwarning").innerHTML = ``;
			document.getElementById("broadcastwarning").innerHTML = ``;
			document.getElementById("spendTicker").innerHTML = `PND`;
			document.getElementById("WalletSpendWarning").innerHTML = ``;
			document.getElementById("developerDonation").value = `1.0`;
		} */

		// log out of openwallet
		$("#walletLogout").click();

		$("#statusSettings").removeClass("alert-success").removeClass("alert-danger").addClass("hidden").html("");
		$("#settings .has-error").removeClass("has-error");

		$.each($(".coinjssetting"),function(i, o) {
			if(!$(o).val().match(/^0x[0-9a-f]+$/)) {
				$(o).parent().addClass("has-error");
			}
		});

		if($("#settings .has-error").length==0) {

			coinjs.pub =  $("#coinjs_pub").val()*1;
			coinjs.priv =  $("#coinjs_priv").val()*1;
			coinjs.multisig =  $("#coinjs_multisig").val()*1;

			coinjs.hdkey.pub =  $("#coinjs_hdpub").val()*1;
			coinjs.hdkey.prv =  $("#coinjs_hdprv").val()*1;

			configureBroadcast();
			configureGetUnspentTx();

            if (coinjs.pub == 0x30) {   // LTC
                explorer_addr = "https://chain.so/address/LTC/";
                coinjs.bech32.hrp = "ltc";
            }
            else if (coinjs.pub == 0x1e) {   // DOGE
                explorer_addr = "https://chain.so/address/DOGE/";
            }

			$("#statusSettings").addClass("alert-success").removeClass("hidden").html("<span class=\"glyphicon glyphicon-ok\"></span> Settings updates successfully").fadeOut().fadeIn();
		} else {
			$("#statusSettings").addClass("alert-danger").removeClass("hidden").html("There is an error with one or more of your settings");
		}
	});

	$("#coinjs_coin").change(function() {

		var o = ($("option:selected",this).attr("rel")).split(";");

		// deal with broadcasting settings
		if(o[5]=="false") {
			$("#coinjs_broadcast, #rawTransaction, #rawSubmitBtn, #openBtn").attr('disabled',true);
			$("#coinjs_broadcast").val("pandacoin_mainnet");
		} else {
			$("#coinjs_broadcast").val(o[5]);
			$("#coinjs_broadcast, #rawTransaction, #rawSubmitBtn, #openBtn").attr('disabled',false);
		}

		// deal with unspent output settings
		if(o[6]=="false") {
			$("#coinjs_utxo, #redeemFrom, #redeemFromBtn, #openBtn, .qrcodeScanner").attr('disabled',true);
			$("#coinjs_utxo").val("pandacoin_mainnet");
		} else {
			$("#coinjs_utxo").val(o[6]);
			$("#coinjs_utxo, #redeemFrom, #redeemFromBtn, #openBtn, .qrcodeScanner").attr('disabled',false);
		}

		// deal with the reset
		$("#coinjs_pub").val(o[0]);
		$("#coinjs_priv").val(o[1]);
		$("#coinjs_multisig").val(o[2]);
		$("#coinjs_hdpub").val(o[3]);
		$("#coinjs_hdprv").val(o[4]);

		// hide/show custom screen
		if($("option:selected",this).val()=="custom") {
			$("#settingsCustom").removeClass("hidden");
		} else {
			$("#settingsCustom").addClass("hidden");
		}
	});
		// All Coins Area
	$("#favoritesSubmitButtonIDHere").click(function() { $("#coinjs_coin").val($("#favoritesFormIDHere input[type='radio']:checked").val()).trigger("change"); $("#settingsBtn").trigger("click"); return false;});
  $("#allcoinsSubmitButtonIDHere").click(function() {
		if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "pnd")) {
      $("#coinjs_coin").val("pandacoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("pandacoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("pandacoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "kmd")) {
      $("#coinjs_coin").val("komodo_mainnet").trigger("change");
      $("#coinjs_broadcast").val("komodo_mainnet").trigger("change");
      $("#coinjs_utxo").val("komodo_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "html")) {
      $("#coinjs_coin").val("htmlcoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("htmlcoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("htmlcoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "dime")) {
      $("#coinjs_coin").val("dimecoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("dimecoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("dimecoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "ppc")) {
      $("#coinjs_coin").val("peercoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("peercoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("peercoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "mint")) {
      $("#coinjs_coin").val("mintcoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("mintcoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("mintcoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "1x2")) {
      $("#coinjs_coin").val("1x2coin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("1x2coin_mainnet").trigger("change");
      $("#coinjs_utxo").val("1x2coin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "utip")) {
      $("#coinjs_coin").val("utip_mainnet").trigger("change");
      $("#coinjs_broadcast").val("utip_mainnet").trigger("change");
      $("#coinjs_utxo").val("utip_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "moon")) {
      $("#coinjs_coin").val("mooncoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("mooncoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("mooncoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "arrr")) {
      $("#coinjs_coin").val("piratechain_mainnet").trigger("change");
      $("#coinjs_broadcast").val("piratechain_mainnet").trigger("change");
      $("#coinjs_utxo").val("piratechain_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "axe")) {
      $("#coinjs_coin").val("axe_mainnet").trigger("change");
      $("#coinjs_broadcast").val("axe_mainnet").trigger("change");
      $("#coinjs_utxo").val("axe_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "aur")) {
      $("#coinjs_coin").val("auroracoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("auroracoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("auroracoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "arg")) {
      $("#coinjs_coin").val("argentum_mainnet").trigger("change");
      $("#coinjs_broadcast").val("argentum_mainnet").trigger("change");
      $("#coinjs_utxo").val("argentum_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "2x2")) {
      $("#coinjs_coin").val("2x2_mainnet").trigger("change");
      $("#coinjs_broadcast").val("2x2_mainnet").trigger("change");
      $("#coinjs_utxo").val("2x2_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "2give")) {
      $("#coinjs_coin").val("2give_mainnet").trigger("change");
      $("#coinjs_broadcast").val("2give_mainnet").trigger("change");
      $("#coinjs_utxo").val("2give_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "404")) {
			$("#coinjs_coin").val("404_mainnet").trigger("change");
			$("#coinjs_broadcast").val("404_mainnet").trigger("change");
			$("#coinjs_utxo").val("404_mainnet").trigger("change");
		}
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "42")) {
      $("#coinjs_coin").val("42coin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("42coin_mainnet").trigger("change");
      $("#coinjs_utxo").val("42coin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "abbc")) {
      $("#coinjs_coin").val("abbc_mainnet").trigger("change");
      $("#coinjs_broadcast").val("abbc_mainnet").trigger("change");
      $("#coinjs_utxo").val("abbc_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "ac")) {
      $("#coinjs_coin").val("asiacoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("asiacoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("asiacoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "acm")) {
			$("#coinjs_coin").val("actinium_mainnet").trigger("change");
			$("#coinjs_broadcast").val("actinium_mainnet").trigger("change");
			$("#coinjs_utxo").val("actinium_mainnet").trigger("change");
		}
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "ade")) {
			$("#coinjs_coin").val("adeptio_mainnet").trigger("change");
			$("#coinjs_broadcast").val("adeptio_mainnet").trigger("change");
			$("#coinjs_utxo").val("adeptio_mainnet").trigger("change");
		}
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "aeg")) {
			$("#coinjs_coin").val("aegeus_mainnet").trigger("change");
			$("#coinjs_broadcast").val("aegeus_mainnet").trigger("change");
			$("#coinjs_utxo").val("aegeus_mainnet").trigger("change");
		}
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "aias")) {
			$("#coinjs_coin").val("aiascoin_mainnet").trigger("change");
			$("#coinjs_broadcast").val("aiascoin_mainnet").trigger("change");
			$("#coinjs_utxo").val("aiascoin_mainnet").trigger("change");
		}
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "alex")) {
			$("#coinjs_coin").val("alexandrite_mainnet").trigger("change");
			$("#coinjs_broadcast").val("alexandrite_mainnet").trigger("change");
			$("#coinjs_utxo").val("alexandrite_mainnet").trigger("change");
		}
		// Include Allsafe or Allsafe2
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "arco")) {
			$("#coinjs_coin").val("aquariuscoin_mainnet").trigger("change");
			$("#coinjs_broadcast").val("aquariuscoin_mainnet").trigger("change");
			$("#coinjs_utxo").val("aquariuscoin_mainnet").trigger("change");
		}
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "arepa")) {
      $("#coinjs_coin").val("arepacoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("arepacoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("arepacoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "ari")) {
      $("#coinjs_coin").val("aricoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("aricoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("aricoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "adc")) {
      $("#coinjs_coin").val("audocoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("audocoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("audiocoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "btc")) {
			$("#coinjs_coin").val("bitcoin_mainnet").trigger("change");
			$("#coinjs_broadcast").val("coinb.in").trigger("change");
			$("#coinjs_utxo").val("coinb.in").trigger("change");
		}
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "dev")) {
      $("#coinjs_coin").val("deviantcoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("deviantcoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("deviantcoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "dgb")) {
      $("#coinjs_coin").val("digibyte_mainnet").trigger("change");
      $("#coinjs_broadcast").val("digibyte_mainnet").trigger("change");
      $("#coinjs_utxo").val("digibyte_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "zeit")) {
      $("#coinjs_coin").val("zeitcoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("zeitcoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("zeitcoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "1337")) {
      $("#coinjs_coin").val("elite_mainnet").trigger("change");
      $("#coinjs_broadcast").val("elite_mainnet").trigger("change");
      $("#coinjs_utxo").val("elite_mainnet").trigger("change");
    }
    else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "block")) {
      $("#coinjs_coin").val("blocknet_mainnet").trigger("change");
      $("#coinjs_broadcast").val("blocknet_mainnet").trigger("change");
      $("#coinjs_utxo").val("blocknet_mainnet").trigger("change");
    }
    else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "lynx")) {
      $("#coinjs_coin").val("lynx_mainnet").trigger("change");
      $("#coinjs_broadcast").val("lynx_mainnet").trigger("change");
      $("#coinjs_utxo").val("lynx_mainnet").trigger("change");
    }
    else if(($("#allcoinsFormIDHere input[type='radio']:checked").val()) == "ltc") {
      $("#coinjs_coin").val("litecoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("litecoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("litecoin_mainnet").trigger("change");
    }
    else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "doge")) {
			$("#coinjs_coin").val("dogecoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("dogecoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("dogecoin_mainnet").trigger("change");
    }

    else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "dash")) {
			$("#coinjs_coin").val("dash_mainnet").trigger("change");
      $("#coinjs_broadcast").val("dash_mainnet").trigger("change");
      $("#coinjs_utxo").val("dash_mainnet").trigger("change");
    }
    else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "via")) {
			$("#coinjs_coin").val("viacoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("viacoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("viacoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "mouse")) {
      $("#coinjs_coin").val("mousecoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("mousecoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("mousecoin_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "rick")) {
      $("#coinjs_coin").val("infiniterick_mainnet").trigger("change");
      $("#coinjs_broadcast").val("infiniterick_mainnet").trigger("change");
      $("#coinjs_utxo").val("infiniterick_mainnet").trigger("change");
    }
    else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "sys")) {
			$("#coinjs_coin").val("syscoin_mainnet").trigger("change");
      $("#coinjs_broadcast").val("syscoin_mainnet").trigger("change");
      $("#coinjs_utxo").val("cryptoid.syscoin_mainnet").trigger("change");
    }
    else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "funk")) {
      $("#coinjs_coin").val("cypherfunk_mainnet").trigger("change");
      $("#coinjs_broadcast").val("cypherfunk_mainnet").trigger("change");
      $("#coinjs_utxo").val("cypherfunk_mainnet").trigger("change");
    }
		else if(($("#allcoinsFormIDHere input[type='radio']:checked").val() == "qtum")) {
      $("#coinjs_coin").val("qtum_mainnet").trigger("change");
      $("#coinjs_broadcast").val("qtum_mainnet").trigger("change");
      $("#coinjs_utxo").val("qtum_mainnet").trigger("change");
    }
		else {
      $("#modalCoinNotWorking").modal("show");
    }
    $("#settingsBtn").trigger("click");
    return false;
  });

		// coinUrl Area
	if(coinUrl == null) {
		$("#settingsBtn").trigger("click");
	}
	else if(coinUrl == 'dev') {
    $("#coinjs_coin").val("deviantcoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("deviantcoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("deviantcoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'utip') {
    $("#coinjs_coin").val("utip_mainnet").trigger("change");
    $("#coinjs_broadcast").val("utip_mainnet").trigger("change");
    $("#coinjs_utxo").val("utip_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'moon') {
    $("#coinjs_coin").val("mooncoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("mooncoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("mooncoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'axe') {
    $("#coinjs_coin").val("axe_mainnet").trigger("change");
    $("#coinjs_broadcast").val("axe_mainnet").trigger("change");
    $("#coinjs_utxo").val("axe_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'arrr') {
    $("#coinjs_coin").val("piratechain_mainnet").trigger("change");
    $("#coinjs_broadcast").val("piratechain_mainnet").trigger("change");
    $("#coinjs_utxo").val("piratechain_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'arepa') {
    $("#coinjs_coin").val("arepacoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("arepacoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("arepacoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'aur') {
    $("#coinjs_coin").val("auroracoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("auroracoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("auroracoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'arg') {
    $("#coinjs_coin").val("argentum_mainnet").trigger("change");
    $("#coinjs_broadcast").val("argentum_mainnet").trigger("change");
    $("#coinjs_utxo").val("argentum_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'ari') {
    $("#coinjs_coin").val("aricoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("aricoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("aricoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'zeit') {
    $("#coinjs_coin").val("zeitcoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("zeitcoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("zeitcoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'alex') {
    $("#coinjs_coin").val("alexandrite_mainnet").trigger("change");
    $("#coinjs_broadcast").val("alexandrite_mainnet").trigger("change");
    $("#coinjs_utxo").val("alexandrite_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'arco') {
    $("#coinjs_coin").val("aquariuscoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("aquariuscoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("aquariuscoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'aias') {
    $("#coinjs_coin").val("aiascoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("aiascoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("aiascoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'aeg') {
    $("#coinjs_coin").val("aegeus_mainnet").trigger("change");
    $("#coinjs_broadcast").val("aegeus_mainnet").trigger("change");
    $("#coinjs_utxo").val("aegeus_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'acm') {
		$("#coinjs_coin").val("actinium_mainnet").trigger("change");
		$("#coinjs_broadcast").val("actinium_mainnet").trigger("change");
		$("#coinjs_utxo").val("actinium_mainnet").trigger("change");
		$("#settingsBtn").trigger("click");
	}
	else if(coinUrl == 'ade') {
		$("#coinjs_coin").val("adeptio_mainnet").trigger("change");
		$("#coinjs_broadcast").val("adeptio_mainnet").trigger("change");
		$("#coinjs_utxo").val("adeptio_mainnet").trigger("change");
		$("#settingsBtn").trigger("click");
	}
	else if(coinUrl == '1337') {
    $("#coinjs_coin").val("elite_mainnet").trigger("change");
    $("#coinjs_broadcast").val("elite_mainnet").trigger("change");
    $("#coinjs_utxo").val("elite_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == '42') {
    $("#coinjs_coin").val("42coin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("42coin_mainnet").trigger("change");
    $("#coinjs_utxo").val("42coin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'abbc') {
    $("#coinjs_coin").val("abbc_mainnet").trigger("change");
    $("#coinjs_broadcast").val("abbc_mainnet").trigger("change");
    $("#coinjs_utxo").val("abbc_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == '404') {
    $("#coinjs_coin").val("404_mainnet").trigger("change");
    $("#coinjs_broadcast").val("404_mainnet").trigger("change");
    $("#coinjs_utxo").val("404_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == '2give') {
    $("#coinjs_coin").val("2give_mainnet").trigger("change");
    $("#coinjs_broadcast").val("2give_mainnet").trigger("change");
    $("#coinjs_utxo").val("2give_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == '1x2') {
    $("#coinjs_coin").val("1x2coin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("1x2coin_mainnet").trigger("change");
    $("#coinjs_utxo").val("1x2coin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == '2x2') {
    $("#coinjs_coin").val("2x2_mainnet").trigger("change");
    $("#coinjs_broadcast").val("2x2_mainnet").trigger("change");
    $("#coinjs_utxo").val("2x2_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'dgb') {
    $("#coinjs_coin").val("digibyte_mainnet").trigger("change");
    $("#coinjs_broadcast").val("digibyte_mainnet").trigger("change");
    $("#coinjs_utxo").val("digibyte_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'funk') {
    $("#coinjs_coin").val("cypherfunk_mainnet").trigger("change");
    $("#coinjs_broadcast").val("cypherfunk_mainnet").trigger("change");
    $("#coinjs_utxo").val("cypherfunk_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'qtum') {
    $("#coinjs_coin").val("qtum_mainnet").trigger("change");
    $("#coinjs_broadcast").val("qtum_mainnet").trigger("change");
    $("#coinjs_utxo").val("qtum_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'sys') {
    $("#coinjs_coin").val("syscoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("syscoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("syscoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'pnd') {
    $("#coinjs_coin").val("pandacoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("pandacoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("pandacoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'kmd') {
    $("#coinjs_coin").val("komodo_mainnet").trigger("change");
    $("#coinjs_broadcast").val("komodo_mainnet").trigger("change");
    $("#coinjs_utxo").val("komodo_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'html') {
    $("#coinjs_coin").val("htmlcoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("htmlcoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("htmlcoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'dime') {
    $("#coinjs_coin").val("dimecoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("dimecoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("dimecoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'ppc') {
    $("#coinjs_coin").val("peercoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("peercoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("peercoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'mint') {
    $("#coinjs_coin").val("mintcoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("mintcoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("mintcoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'mouse') {
    $("#coinjs_coin").val("mousecoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("mousecoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("mousecoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'rick') {
    $("#coinjs_coin").val("infiniterick_mainnet").trigger("change");
    $("#coinjs_broadcast").val("infiniterick_mainnet").trigger("change");
    $("#coinjs_utxo").val("infiniterick_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'lynx') {
    $("#coinjs_coin").val("lynx_mainnet").trigger("change");
    $("#coinjs_broadcast").val("lynx_mainnet").trigger("change");
    $("#coinjs_utxo").val("lynx_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'dash') {
    $("#coinjs_coin").val("dash_mainnet").trigger("change");
    $("#coinjs_broadcast").val("dash_mainnet").trigger("change");
    $("#coinjs_utxo").val("dash_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'block') {
    $("#coinjs_coin").val("blocknet_mainnet").trigger("change");
    $("#coinjs_broadcast").val("blocknet_mainnet").trigger("change");
    $("#coinjs_utxo").val("blocknet_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'doge') {
    $("#coinjs_coin").val("dogecoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("dogecoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("dogecoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'ltc') {
    $("#coinjs_coin").val("litecoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("litecoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("litecoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'via') {
    $("#coinjs_coin").val("viacoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("viacoin_mainnet").trigger("change");
    $("#coinjs_utxo").val("viacoin_mainnet").trigger("change");
    $("#settingsBtn").trigger("click");
  }
	else if(coinUrl == 'btc') {
		$("#coinjs_coin").val("bitcoin_mainnet").trigger("change");
    $("#coinjs_broadcast").val("coinb.in").trigger("change");
    $("#coinjs_utxo").val("coinb.in").trigger("change");
    $("#settingsBtn").trigger("click");
	}
	if (emailUrl == null) { }
  else {
    document.getElementById("openEmail").value = emailUrl;
  }
  if (passwordUrl == null) { }
  else {
    document.getElementById("openPass").value = passwordUrl;
    document.getElementById("openPassConfirm").value = passwordUrl;
  }

	function configureBroadcast() {
		var host = $("#coinjs_broadcast option:selected").val();

        // api:             blockcypher     blockchair      chain.so
        // network name     "btc"           "bitcoin"       "BTC"
        // network name     "ltc"           "litecoin"      "LTC"
        // network name     "doge"          "dogecoin"      "DOGE"
		$("#rawSubmitBtn").unbind("");
		if(host=="coinb.in") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitChainso(this, "BTC");
			});
		} else if(host=="litecoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitChainso(this, "LTC");
			});
		} else if(host=="dogecoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitChainso(this, "DOGE");
			});
		} else if(host=="deviantcoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitDeviantCoin(this);
			});
		} else if(host=="blocknet_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitBlocknet(this);
			});
		} else if(host=="pandacoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitpandacoin(this);
			});
		} else if(host=="komodo_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitKomodo(this);
			});
		} else if(host=="htmlcoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitHtmlCoin(this);
			});
		} else if(host=="dimecoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitDimeCoin(this);
			});
		} else if(host=="peercoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitPeerCoin(this);
			});
		} else if(host=="mintcoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitMintCoin(this);
			});
		} else if(host=="aricoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitAricoin(this);
			});
		} else if(host=="mousecoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitMouseMN(this);
			});
		} else if(host=="qtum_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitqtum(this);
			});
		} else if(host=="lynx_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitlynx(this);
			});
		} else if(host=="syscoin_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitsyscoin(this);
			});
		} else if(host=="cypherfunk_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitCypherFunk(this);
			});
		}  else if(host=="dash_mainnet") {
			$("#rawSubmitBtn").click(function() {
				rawSubmitdash(this);
			});
		}  else if(host=="viacoin_mainnet") {
      $("#rawSubmitBtn").click(function() {
        rawSubmitViacoin(this);
      });
    } else if(host=='infiniterick_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitInfiniteRick(this);
      });
		} else if(host=='digibyte_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitDigiByte(this);
      });
		} else if(host=='elite_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitElite(this);
      });
		} else if(host=='1x2coin_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmit1x2Coin(this);
      });
		} else if(host=='2x2_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmit2x2(this);
      });
		} else if(host=='2give_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmit2Give(this);
      });
		} else if(host=='404_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmit404(this);
      });
		} else if(host=='42coin_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmit42Coin(this);
      });
		} else if(host=='abbc_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitAbbc(this);
      });
		} else if(host=='asiacoin_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitAsiaCoin(this);
      });
		} else if(host=='actinium_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitActinuium(this);
      });
		} else if(host=='adeptio_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitAdeptio(this);
      });
		} else if(host=='aegeus_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitAegeus(this);
      });
		} else if(host=='aiascoin_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitAiasCoin(this);
      });
		} else if(host=='alexandrite_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitAlexandrite(this);
      });
		} else if(host=='aquariuscoin_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitAquariusCoin(this);
      });
		} else if(host=='auroracoin_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitAuroraCoin(this);
      });
		} else if(host=='arepacoin_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitArepaCoin(this);
      });
		} else if(host=='zeitcoin_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawSubmitZeitCoin(this);
      });
		} else if(host=='argentum_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawsubmitArgentum(this);
      });
		} else if(host=='axe_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawsubmitAxe(this);
      });
		} else if(host=='piratechain_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawsubmitPirateChain(this);
      });
		} else if(host=='mooncoin_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawsubmitMoonCoin(this);
      });
		} else if(host=='utip_mainnet') {
			$("#rawSubmitBtn").click(function() {
        rawsubmituTip(this);
      });
		} else {
			$("#rawSubmitBtn").click(function() {
				rawSubmitDefault(this); // revert to default
			});
		}
	}
	// Broadcast Area

	function configureGetUnspentTx() {
		$("#redeemFromBtn").attr('rel',$("#coinjs_utxo option:selected").val());
	}


	/* fees page code */

	$("#fees .slider").on('input', function() {
		$('.'+$(this).attr('rel')+' .inputno, .'+$(this).attr('rel')+' .outputno',$("#fees")).html($(this).val());
		$('.'+$(this).attr('rel')+' .estimate',$("#fees")).removeClass('hidden');
	});

	$("#fees .txo_p2pkh").on('input', function() {
		var outputno = $('.'+$(this).attr('rel')+' .outputno',$("#fees .txoutputs")).html();
		$('.'+$(this).attr('rel')+' .bytes',$("#fees .txoutputs")).html((outputno*$("#est_txo_p2pkh").val())+(outputno*9));
		mathFees();
	});

	$("#fees .txo_p2sh").on('input', function() {
		var outputno = $('.'+$(this).attr('rel')+' .outputno',$("#fees .txoutputs")).html();
		$('.'+$(this).attr('rel')+' .bytes',$("#fees .txoutputs")).html((outputno*$("#est_txo_p2sh").val())+(outputno*9));
		mathFees();
	});

	$("#fees .txi_regular").on('input', function() {
		var inputno = $('.'+$(this).attr('rel')+' .inputno',$("#fees .txinputs")).html();
		$('.'+$(this).attr('rel')+' .bytes',$("#fees .txinputs")).html((inputno*$("#est_txi_regular").val())+(inputno*41));
		mathFees();
	});

	$("#fees .txi_segwit").on('input', function() {
		var inputno = $('.'+$(this).attr('rel')+' .inputno',$("#fees .txinputs")).html();
		var bytes = 0;
		if(inputno >= 1) {
			bytes = 2;
			bytes += (inputno*32);
			bytes += (inputno*$("#est_txi_segwit").val());
			bytes += (inputno*(41))
		}

		bytes = bytes.toFixed(0);
		$('.'+$(this).attr('rel')+' .bytes',$("#fees .txinputs")).html(bytes);
		mathFees();
	});

	$("#fees .txi_multisig").on('input', function() {
		var inputno = $('.'+$(this).attr('rel')+' .inputno',$("#fees .txinputs")).html();
		$('.'+$(this).attr('rel')+' .bytes',$("#fees .txinputs")).html((inputno*$("#est_txi_multisig").val())+(inputno*41));
		mathFees();
	});

	$("#fees .txi_hodl").on('input', function() {
		var inputno = $('.'+$(this).attr('rel')+' .inputno',$("#fees .txinputs")).html();
		$('.'+$(this).attr('rel')+' .bytes',$("#fees .txinputs")).html((inputno*$("#est_txi_hodl").val())+(inputno*41));
		mathFees();
	});

	$("#fees .txi_unknown").on('input', function() {
		var inputno = $('.'+$(this).attr('rel')+' .inputno',$("#fees .txinputs")).html();
		$('.'+$(this).attr('rel')+' .bytes',$("#fees .txinputs")).html((inputno*$("#est_txi_unknown").val())+(inputno*41));
		mathFees();
	});

	$("#fees .sliderbtn.down").click(function() {
		var val = $(".slider",$(this).parent().parent()).val()*1;
		if(val>($(".slider",$(this).parent().parent()).attr('min')*1)) {
			$(".slider",$(this).parent().parent()).val(val-1);
			$(".slider",$(this).parent().parent()).trigger('input');
		}
	});

	$("#fees .sliderbtn.up").click(function() {
		var val = $(".slider",$(this).parent().parent()).val()*1;
		if(val<($(".slider",$(this).parent().parent()).attr('max')*1)) {
			$(".slider",$(this).parent().parent()).val(val+1);
			$(".slider",$(this).parent().parent()).trigger('input');
		}
	});

	$("#advancedFeesCollapse").click(function() {
		if($("#advancedFees").hasClass('hidden')) {
			$("span",this).removeClass('glyphicon-collapse-down').addClass('glyphicon-collapse-up');
			$("#advancedFees").removeClass("hidden");
		} else {
			$("span",this).removeClass('glyphicon-collapse-up').addClass('glyphicon-collapse-down');
			$("#advancedFees").addClass("hidden");
		}
	});

	$("#feesAnalyseBtn").click(function() {
		if(!$("#fees .txhex").val().match(/^[a-f0-9]+$/ig)) {
			alert('You must provide a hex encoded transaction');
			return;
		}

		var tx = coinjs.transaction($("#coinjs_utxo option:selected").val());
		var deserialized = tx.deserialize($("#fees .txhex").val());

		$("#fees .txoutputs .outputno, #fees .txinputs .inputno").html("0");
		$("#fees .txoutputs .bytes, #fees .txinputs .bytes").html("0");
		$("#fees .slider").val(0);

		for(var i = 0; i < deserialized.ins.length; i++) {
			var script = deserialized.extractScriptKey(i);
			var size = 41;
			if(script.type == 'segwit') {
				if(deserialized.witness[i]) {
					size += deserialized.ins[i].script.buffer.length / 2;
					for(w in deserialized.witness[i]) {
						size += (deserialized.witness[i][w].length / 2) /4;
					}
				} else {
					size += $("#est_txi_segwit").val()*1;
				}
				$("#fees .segwit .inputno").html(($("#fees .segwit .inputno").html()*1)+1);
				$("#fees .txi_segwit").val(($("#fees .txi_segwit").val()*1)+1);
				$("#fees .segwit .bytes").html(($("#fees .segwit .bytes").html()*1)+size);

			} else if(script.type == 'multisig') {
				var s = coinjs.script();
				var rs = s.decodeRedeemScript(script.script);
				size += 4 + ((script.script.length / 2) + (73 * rs.signaturesRequired));
				$("#fees .multisig .inputno").html(($("#fees .multisig .inputno").html()*1)+1);
				$("#fees .txi_multisig").val(($("#fees .txi_multisig").val()*1)+1);
				$("#fees .multisig .bytes").html(($("#fees .multisig .bytes").html()*1)+size);

			} else if(script.type == 'hodl') {
				size += 78;
				$("#fees .hodl .inputno").html(($("#fees .hodl .inputno").html()*1)+1);
				$("#fees .txi_hodl").val(($("#fees .txi_hodl").val()*1)+1);
				$("#fees .hodl .bytes").html(($("#fees .hodl .bytes").html()*1)+size);

			} else if(script.type == 'empty' || script.type == 'scriptpubkey') {
				if(script.signatures == 1) {
					size += script.script.length / 2;
				} else {
					size += $("#est_txi_regular").val()*1;
				}

				$("#fees .regular .inputno").html(($("#fees .regular .inputno").html()*1)+1);
				$("#fees .txi_regular").val(($("#fees .txi_regular").val()*1)+1);
				$("#fees .regular .bytes").html(($("#fees .regular .bytes").html()*1)+size);

			} else if(script.type == 'unknown') {
				size += script.script.length / 2;
				$("#fees .unknown .inputno").html(($("#fees .unknown .inputno").html()*1)+1);
				$("#fees .txi_unknown").val(($("#fees .txi_unknown").val()*1)+1);
				$("#fees .unknown .bytes").html(($("#fees .unknown .bytes").html()*1)+size);
			}
		}

		for(var i = 0; i < deserialized.outs.length; i++) {
			if(deserialized.outs[i].script.buffer[0]==118) {
				$("#fees .txoutputs .p2pkh .outputno").html(($("#fees .txoutputs .p2pkh .outputno").html()*1)+1);
				$("#fees .txoutputs .p2pkh .bytes").html(($("#fees .txoutputs .p2pkh .bytes").html()*1)+34);
				$("#fees .txo_p2pkh").val(($("#fees .txo_p2pkh").val()*1)+1);
			} else if (deserialized.outs[i].script.buffer[0]==169) {
				$("#fees .txoutputs .p2sh .outputno").html(($("#fees .txoutputs .p2sh .outputno").html()*1)+1);
				$("#fees .txoutputs .p2sh .bytes").html(($("#fees .txoutputs .p2sh .bytes").html()*1)+32);
				$("#fees .txo_p2sh").val(($("#fees .txo_p2sh").val()*1)+1);
			}
		}

		 feeStats();
	});

	$("#feeStatsReload").click(function() {
		feeStats();
	});

	function mathFees() {

		var inputsTotal = 0;
		var inputsBytes = 0;
		$.each($(".inputno"), function(i,o) {
			inputsTotal += ($(o).html()*1);
			inputsBytes += ($(".bytes",$(o).parent()).html()*1);
		});

		$("#fees .txinputs .txsize").html(inputsBytes.toFixed(0));
		$("#fees .txinputs .txtotal").html(inputsTotal.toFixed(0));

		var outputsTotal = 0;
		var outputsBytes = 0;
		$.each($(".outputno"), function(i,o) {
			outputsTotal += ($(o).html()*1);
			outputsBytes += ($(".bytes",$(o).parent()).html()*1);
		});

		$("#fees .txoutputs .txsize").html(outputsBytes.toFixed(0));
		$("#fees .txoutputs .txtotal").html(outputsTotal.toFixed(0));

		var totalBytes = 10 + outputsBytes + inputsBytes;
		if((!isNaN($("#fees .feeSatByte:first").html())) && totalBytes > 10) {
			var recommendedFee = ((totalBytes * $(".feeSatByte").html())/100000000).toFixed(8);
			$(".recommendedFee").html(recommendedFee);
			$(".feeTxSize").html(totalBytes);
		} else {
			$(".recommendedFee").html((0).toFixed(8));
			$(".feeTxSize").html(0);
		}
	};

	function feeStats() {
		$("#feeStatsReload").attr('disabled',true);
		$.ajax ({
			type: "GET",
			url: "https://coinb.in/api/?uid=1&key=12345678901234567890123456789012&setmodule=fees&request=stats",
			dataType: "xml",
			error: function(data) {
			},
			success: function(data) {
				$("#fees .recommended .blockHeight").html('<a href="https://coinb.in/height/'+$(data).find("height").text()+'" target="_blank">'+$(data).find("height").text()+'</a>');
				$("#fees .recommended .blockHash").html($(data).find("block").text());
				$("#fees .recommended .blockTime").html($(data).find("timestamp").text());
				$("#fees .recommended .blockDateTime").html(unescape($(data).find("datetime").text()).replace(/\+/g,' '));
				$("#fees .recommended .txId").html('<a href="https://coinb.in/tx/'+$(data).find("txid").text()+'" target="_blank">'+$(data).find("txid").text()+'</a>');
				$("#fees .recommended .txSize").html($(data).find("txsize").text());
				$("#fees .recommended .txFee").html($(data).find("txfee").text());
				$("#fees .feeSatByte").html($(data).find("satbyte").text());

				mathFees();
			},
			complete: function(data, status) {
				$("#feeStatsReload").attr('disabled', false);
			}
		});
	}

	/* capture mouse movement to add entropy */
	var IE = document.all?true:false // Boolean, is browser IE?
	if (!IE) document.captureEvents(Event.MOUSEMOVE)
	document.onmousemove = getMouseXY;
	function getMouseXY(e) {
		var tempX = 0;
		var tempY = 0;
		if (IE) { // If browser is IE
			tempX = event.clientX + document.body.scrollLeft;
			tempY = event.clientY + document.body.scrollTop;
		} else {
			tempX = e.pageX;
			tempY = e.pageY;
		};

		if (tempX < 0) {tempX = 0};
		if (tempY < 0) {tempY = 0};
		var xEnt = Crypto.util.bytesToHex([tempX]).slice(-2);
		var yEnt = Crypto.util.bytesToHex([tempY]).slice(-2);
		var addEnt = xEnt.concat(yEnt);

		if ($("#entropybucket").html().indexOf(xEnt) == -1 && $("#entropybucket").html().indexOf(yEnt) == -1) {
			$("#entropybucket").html(addEnt + $("#entropybucket").html());
		};

		if ($("#entropybucket").html().length > 128) {
			$("#entropybucket").html($("#entropybucket").html().slice(0, 128))
		};

		return true;
	};

	var clipboard = new ClipboardJS('.btn');

  clipboard.on('success', function(e) {
      console.log(e);
  });

  clipboard.on('error', function(e) {
      console.log(e);
  });
});
