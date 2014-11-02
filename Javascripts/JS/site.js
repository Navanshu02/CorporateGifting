var rec_cnt = 0; var expanded = true; var set_collapse = 0; var doToggle = 1;

$(document).ready(function(){
	//Script to check touch devices
    if(Modernizr.touch){
        $('#navigation_holder').addClass('touch_nav');
    }
    //Script to check touch devices ends here


            $(".top_notification").slideDown('slow');
	        $("div.product-list ul").show();
	        $("div.nav-open").show();

	        $('.pay_with_confidence').cycle({
				fx:    'fade',
				timeout: 3000,
				speed: 800,
				pause: 0
			});


			$("#loginpop").click(function() {

				block_reg_popup=true;
				$("#loginBox").fadeIn(50);
				$("#login-form #emailid").focus();
				$('#login-form')[0].reset();
				$('#login-form .validation-advice').css("display","none");

			});

			$("#loginpop1").click(function() {
					$("#signupBox").fadeOut(50);
					$("#loginBox").fadeIn(50);
					$("#login-form #emailid").focus();
					$('#login-form')[0].reset();
			  		$('#login-form .validation-advice').css("display","none");
			});

			$("#signuppop").click(function() {
				block_reg_popup=true;
				openModel('signupBox');
				$("#signup-form #email").focus();
				$('#signup-form')[0].reset();
				$('#error_msg').html("");
				$('#signup-form .validation-advice').css("display","none");
			});

			$("#signuppop1").click(function() {
					$("#loginBox").fadeOut(50);
					openModel('signupBox');
					$("#signup-form #email").focus();
					$('#error_msg').html("");
					$('#signup-form')[0].reset();
					$('#signup-form .validation-advice').css("display","none");

			});

			$('#signupmodal').click(function(){
				block_reg_popup=true;
				_gaq.push(['_trackEvent', 'homepage-reg-modal', 'homepage-rhs-3', 'modal_open']);
				openModel('signupBox');
			});

			$("#frgtPass").click(function() {
				    $('#loginBox').fadeOut(0);
				   	$("#forgetPassBox").fadeIn(0);
				    $('#reset-form')[0].reset();
			});


			$("#frgtPassCheckout").click(function() {
					$('#chackoutLogin').fadeOut(0);
				  	$("#forgetPassBox").fadeIn(0);
			});

			$("#frgtPassMreg").click(function() {
					$('#mregSignupBox').fadeOut(0);
				  	$("#forgetPassBox").fadeIn(0);
			});



			$("#shoppingcart").mouseenter(function () {
				$('#status').val(1);
				$("#cartblock").addClass("summary trigger-minicart cart-bdr");
				$("#item_info").addClass("selected");
				$("#cart_popup").show();
			});

			$("#shoppingcart").mouseleave(function () {
				$('#status').val(0);
				$("#cartblock").removeClass("cart-bdr");
				$("#item_info").removeClass("selected");
				$("#cart_popup").hide();
				setTimeout(hidenewcart,0);
			});

			$("#myacc").mouseenter(function () {
				$("#myacc_link").addClass("selected");
				$("#myacc_dropdown").show();

			});

			$("#myacc").mouseleave(function () {
				$("#myacc_link").removeClass("selected");
				$("#myacc_dropdown").hide();
			});

			var minicart_timer;

			$(".trigger-minicart").hover(function(){
				$("#minicart").slideDown();
			});

			$("#minicart").mouseleave(function(){
				$("#minicart").slideUp();
			});

			$("#minicart").hover(function(){
				clearTimeout(minicart_timer);
			});


			// Script for Megamenu
            var furtab_ref,mmenu_tout,curr_menu,curr_menu_child;
            $('.fur_menu_tabs ul li').hover(function(){
	            $('.fur_menu_tabs ul li').removeClass('active');
	            $(this).addClass('active');
	            furtab_ref = '#'+$(this).data('ref');
	            $('.fur_menu_tabs ul li').removeClass('active');
	            $(this).addClass('active');
	            $('.abso_menu_slide:not("'+furtab_ref+'")').stop(true,true).fadeOut(300);
	            $(furtab_ref).stop(true,true).fadeIn(300);
            });
            $('.navigation ul li.level-top').hover(function(){
                curr_menu = $(this);
                curr_menu_child = $(this).find('.megamenu');
                clearTimeout(mmenu_tout);
                $('.megamenu').not($(this).find('.megamenu')).fadeOut(200);
                if(curr_menu.find('.megamenu').length > 0){
                    mmenu_tout = setTimeout(function(){
                        curr_menu.find('.megamenu').fadeIn(300); $('.transoverlay').show();
                        $('.navigation ul li.level-top').removeClass('curr_menu_item');
                        curr_menu.addClass('curr_menu_item');
                    }, 300);
                }
                if($('#floating_menu').hasClass('fixed_floating')){
                    $(this).find('.megamenu_tip').css('left',$(this).position().left + ($(this).width() / 2) - 30 + 'px');
                }else{
                    $(this).find('.megamenu_tip').css('left',$(this).position().left + ($(this).width() / 2) - 26 + 'px');
                }
            });

            // Script for preventing megamenu in touch devices
            $('#navigation a.level-top').click(function(e){
                if(!Modernizr.touch){
                    return true;
                }else{
                    if($(this).parent().find('.megamenu').is(':visible')){
                        return true;
                    }else{
                        $('.navigation ul li.level-top').trigger('hover');
                        return false;
                    }
                }
            });


            $('.transoverlay').hover(function(){
                clearTimeout(mmenu_tout);
                mmenu_tout = setTimeout(function(){ $('.megamenu,.transoverlay').fadeOut(300);
                    $('.navigation ul li.level-top').removeClass('curr_menu_item');
                }, 300);
            });
            $('#navigation').mouseleave(function(){
                clearTimeout(mmenu_tout);
                mmenu_tout = setTimeout(function(){ $('.megamenu,.transoverlay').fadeOut(300);
                    $('.navigation ul li.level-top').removeClass('curr_menu_item');
                }, 300);
            });
            /*
             * No need of this ajax call until we open recently viewed.
             */
            if(window.innerWidth >= 1280) {
            	var proto = document.location.protocol;
            	var current_url = document.URL;
            	if((proto == 'http:' && page_type != 'static_pages') ||
            	(proto == 'https:' &&
            	(current_url.indexOf("/checkout/cart") > -1 ||
            	current_url.indexOf("/customer/") > -1))) {
            		expanded = (current_url.indexOf("/checkout/cart") > -1) ? false : true;
            		if(expanded) {
            			doToggle = readCookie("pfkrcv");
            		} else {
            			doToggle = 0;
            		}
            		getRecentlyViewed();
            	}
            }

            $(document).on('click','.rec_title',function(){
            	toggleRecentView();
            });

            var curr_close_el,curr_el_ul,curr_el_ul_next;
			$(document).on('click','.rec_cross',function(){
				curr_close_el = $(this);
				var id = $(this).prop('id');
				$.ajax({
					url:'/site_page/remove_recent_view',
	    			type:'post',
	    			data:{id:id},
	    			success: function (data){
	    				var d = $.parseJSON(data);
	    				var count = Object.keys(d).length;
	    				if(count > 0) {
	    					curr_close_el.parent().fadeOut(150,function(){
	    						curr_close_el.parent().remove();
	    					});
	    				}
	    				if(parseInt(doToggle) == 0) doToggle = 1;
	    				renderRecentView(data);
	    			},
	    			error : function(){
	    			}
				});

			});

			// header search
			$('#search').focus(function(){
                if($('#floating_menu').hasClass('fixed_floating')){
                	$('div.navigation').addClass('active').removeClass('def_s_active');
                }else{
                    $('div.navigation').addClass('def_s_active');
                }
                    clearTimeout(mmenu_tout);
                    $('.megamenu,.transoverlay').fadeOut(200);
			});
			$('#search').blur(function(){
                $('div.navigation').removeClass('active').removeClass('def_s_active');
                clearTimeout(mmenu_tout);
                $('.megamenu,.transoverlay').fadeOut(200);
                        });

                    //Search submit button click expand search input
                    $('#search_submit').click(function(){
                        checkForm();
                    });



                    try{
                        /*Home page trending */
                        if($("#slide").length > 0) {
                            $("#slide").find("img.lazy").css({'width':'150px', 'height':'165px'});
                            $("#slide").find("img.no_loader").css({'width':'150px', 'height':'165px'});
                            $("img.lazy").lazy({
                                   bind:'event',
                                   threshold:1000,
                                   beforeLoad: function(element) {
                                   element.removeClass("lazy");
                                },
                               onLoad: function(element) {
                                   element.addClass("loading");
                               },
                               afterLoad: function(element) {
                                   element.removeClass("loading").addClass("loaded");
                                   element.attr('style','');
                                   element.css({'display':'inline'});
                               },
                               onError: function(element) {
                               }
                               });
                               $("#slide").find('img').each(function(){
                                    var src = $(this).attr('data-src');
                                    if(typeof src != 'undefined') {
                                        $(this).attr('src', src);
                                    }
                                });
                        }

                    }
                    catch(err){
                    }

		});


		function toggleRecentView() {
			if($('.rec_title').hasClass('active')){
				$('.recently_viewed_wrap').slideUp(400, function() {
					if(expanded) createCookie("pfkrcv","0",30);
				});
				$('.rec_title').removeClass('active').prop('title','Click to Expand');
        	}else{
        		if(rec_cnt == 0){
        			// Slideshow for Recently viewed
        			$('.recently_viewed_slideshow').cycle({
        				fx:    'scrollHorz',
        				timeout: 0,
        				speed: 200,
        				pause: 1,
        				prev: '.rec_view_nav_wrap .left',
        				next: '.rec_view_nav_wrap .right',
        				autostop: 0,
        				autostopCount: 0
        			});
        			rec_cnt = 1;
        		}
        		$('.recently_viewed_wrap').slideDown(400, function() {
        			if(expanded) createCookie("pfkrcv","1",30);
    			});
        		$('.rec_title').addClass('active').prop('title','Click to Collapse');

        	}
		}

		function getRecentlyViewed() {
			$.ajax({
    			url:'/site_page/get_recent_views',
    			type:'get',
    			success: function (data){
    				renderRecentView(data);
    			},
    			error : function(){
    			}
    		});
		}

		function renderRecentView(data)
		{
			var d = $.parseJSON(data);
			if(d.hasOwnProperty('op') && d.op == '1') {
				var count = Object.keys(d.data).length;
				if(count > 0) {
					$('.recently_viewed').remove();
					var html = '<div class="recently_viewed">';
						html += '<a href="javascript:void(0)" title="Click to Expand" class="tooltip rec_title">Recently Viewed</a>';
						html +=	'<div class="recently_viewed_wrap">';
							html += '<div class="recently_viewed_slideshow">';
							var counter = 1;
							var ul_closed = false;
							var rendered = false;
							for(var i in d.data) {
								if(typeof product_id == 'undefined' || d.data[i].indexOf(product_id) == -1) {
									rendered = true;
									if(counter == 1) {
										html += '<ul>';
										ul_closed = false;
									}
									html += d.data[i];

									if(counter == 3) {
										html += '</ul>';
										counter=0;
										ul_closed = true;
									}
									counter++;
								} else {
									count--;
								}
							}
							if(!ul_closed) {
								html += '</ul>';
							}
							html += '</div>';
							if(count > 3) {
								html += '<div class="rec_view_nav_wrap">';
									html += '<a href="#" class="arrow left"></a>';
									html += '<a href="#" class="arrow right"></a>';
								html += '</div>';
							}
						html += '</div>'
					html +=    '</div>';
					if(rendered) {
						$('body').append(html);
						if(parseInt(doToggle) == 1 || doToggle == null) {
							rec_cnt = 0;
							toggleRecentView();
						}
					} else {
						html = '';
					}
				} else {
					$('.recently_viewed').fadeOut('slow', function(){
						$('.recently_viewed').remove();
					});
				}
			} else {
				$('.recently_viewed').fadeOut('slow', function(){
					$('.recently_viewed').remove();
				});
			}
		}

		function returning_customer(){
				if(checkOOS() == false) {
					return false;
				} else {
					setTimeout(function(){
					  	$("#chackoutLogin").fadeIn(0);
					}, 0);
					return false;
				}
			}

	function checkForm(){
		var search = $('#search').val();
		if(search != '' && search.length >= 3){
			/*if($.trim($('#in_which').val()).length > 0 && $.trim($('#og_search_term').val()).length > 0) {
				$('<input>').attr({
				    type: 'hidden',
				    id: 'foo',
				    name: $.trim($('#in_which').val()),
				    value:$.trim($('#og_search_term').val())
				}).appendTo('#search_mini_form');
			}*/

			$('#search_os').val(search);
			_gaq.push(['_trackEvent', 'Search Box', 'Click', 'Submit']);
			return true;
		}
        $('#search').focus();
        if($('#floating_menu').hasClass('fixed_floating')){
        	$('div.navigation').addClass('active').removeClass('def_s_active');
        }else{
            $('div.navigation').addClass('def_s_active');
        }
		return false;
	}

	function showfilter(div_id1,div_id2){
	 	$('#'+div_id1).show();
		$('#'+div_id2).hide();
	}

	function setLocation(url){
            if (window.location.protocol == "https:") {
                url=url.replace("http://","https://");
            }else{
                url=url;
            }
            window.location = url;
	}

	function hidenewcart(){
		if(document.getElementById("cart_popup").style.display=="block")
		{
			var status = $('#status').val();
			if(parseInt(status)==0)
			{
				document.getElementById("cart_popup").style.display="none";
			}
		}
	}


	function setCart(product_id, qty, redirect_callback, configure, prod_crum,buy_now){
    	if(typeof(qty)==='undefined') {
			qty = 1;
		}else{
			//post data
		}
    	if(typeof(redirect_callback)==='undefined') {
    		redirect_callback = '';
		}
    	if(typeof(configure)==='undefined') {
    		configure = 0;
		}
		params = {};
		params['crumb']=prod_crum;

		var ex = 'cp=ac';
		if(typeof(buy_now)!='undefined' && buy_now==1) {
    		params['buy_now']=1;
    		ex = 'cp=bn';
		}
		$.ajax({
			url:root_url+'/cart/add' + '?' + ex,
			type:'POST',
			data:{product_id:product_id,qty:qty,params:params},
			success: function (data){
				if($.isNumeric(data))
				{
					if(data == '0')
					{
						alert('Out Of Stock');
					}
					else
					{
						alert('You can add max '+data+' quantity for this product');
					}
				}
				else
				{
					$('.transparent_bg').hide();
					$('.quick_look').html('');
					$('#parent').html(data);
					if(!redirect_callback){
						$("#item_info").addClass("selected");
						$('#cart_popup').show();
					}
					/*var cartItemData = {};
					if(page_type == 'vip')
					{
						cartItemData = itemData;
					}
					else if((page_type == 'listing' || page_type == 'search' || page_type == 'selection') && itemData.length > 0)
					{
						//alert(JSON.stringify(itemData));
						for(var i in itemData)
						{
							var items = itemData[i];
							if(items.id == product_id)
							{
								cartItemData = items;
								break;
							}
						}
					}
					cartItemData.quantity = qty;
					dataLayer.push({
						'event': 'addToCart',
						'ecommerce': {
							'currencyCode': 'INR',
						    'add': {                                // 'add' actionFieldObject measures.
						    	'products': [cartItemData]
						    }
						}
					});*/
					_gaq.push(['_trackEvent', 'CLIP', 'Click', 'Add to Cart',, true]);
					$(window).scrollTop(0);
					$("#message_added").show().delay(3000).fadeOut('slow');

					 if(redirect_callback != ''){
						 window[redirect_callback]();
					 }
					 return false;
				}
			},
			error : function(){
				alert('Try later.');
			}
		});
	}


	function ajax_popup(url){
		if(url != ''){
			$.ajax({
				url:root_url + url,
				success:function(data){
					$('#quick_view').show();
					$('.quick_look').html(data);
					jQuery.ready();
					setCarousel();
				},
				error:function(xhr, error){
					$('#quick_view').show();
					$('.quick_look').html('Please Try Later');
				}
			});
		}
	}
	function guide_popup(url){
		if(url != ''){
			$.ajax({
				url:root_url + url,
				success:function(data){
					$('#guide_pop').show();
					$('.popup_inner').html(data);
				},
				error:function(xhr, error){
					$('#guide_pop').show();
					$('.popup_inner').html('Please Try Later');
				}
			});
		}
	}

	function quick_view(id){
		$.ajaxSetup({cache:true});
		if(id > 0){
			$.ajax({
				url:root_url+'/site_product/inline_vip/'+id + '?cp=qw',
				success:function(data){
					$('#quick_view').show();
					$('.quick_look').html(data);
					jQuery.ready();
					setCarousel();
				},
                cache: true,
				error:function(xhr, error){
					$('#quick_view').show();
					$('.quick_look').html('Please Try Later');
				}
			});
		}
	}
	$("#quick_view").on("click", '.cross', function(event){
		$('.transparent_bg').hide();
	});


	//popup for login , signup , checkout login , password recover
	function quick_popup(url){
		if(url != ''){
			$.ajax({
				url:root_url + url,
				success:function(data){
					$('#loginBox').show();
					$('#loginBoxInner').html(data);
				},
				error:function(xhr, error){
					$('#loginBox').show();
					$('#loginBoxInner').html('Please Try Later');
				}
			});
		}
	}

	$('#cross').click(function(){

		$('.transparent_bg').hide();
		$('.popups').html('');

	});
	$("#guide_pop").on("click", '.cross', function(event){
		$("#guide_pop").hide();
	 });

	/* spicy offer div*/


	$(function()

	 {
		$(document).ready(function(){
		// hide #back-top first
			$("#back-top").hide();
			// fade in #back-top
			$(function () {
				$(window).scroll(function () {
					if ($(this).scrollTop() > 100) {
						$('#back-top').fadeIn();
					} else {
						$('#back-top').fadeOut();
					}
				});

				// scroll body to 0px on click
				$('#back-top a').click(function () {
					$('body,html').animate({
						scrollTop: 0
					}, 400);
					return false;
				});
			});

			$('#hotoffer').click(function(){
				//alert();
				_gaq.push(['_trackEvent', 'Todays Special', 'Click', 'Popup',, true]);
				$('#spicy-offer').fadeIn('fast',function(){
					$('#box').animate({'top':'300px'},500);
				});
			});
			$('#boxclose').click(function(){
				$('#box').animate({'top':'-500px'},500,function(){
					$('#spicy-offer').fadeOut('fast');
				});
			});
		});



    });




// for item add to wishlist
function makeWish(product_id,success_location)
{
    var success_msg_path = '#added_in_wish_list_'+product_id;
    var path = secure_url +"/customer_wishlist/add";
    dType = 'https:' == location.protocol ? 'json' : 'jsonp';
    $.ajax({
        url: path,
        dataType:dType,
        data:{product_id : product_id},
        type: "POST",
        beforeSend: function() {},
        success: function(data){
        	//alert(data);
        	if(data == "true" || data == true){
                $('.wish_icon_1').addClass('selected');
                $('.add_wlist_icon').prop('title', 'Added to your wishlist');
            	$(success_msg_path).css("display","block");
                _gaq.push(['_trackEvent', 'CLIP', 'Click', 'Add to Wishlist',, true]);
            } else if(data == 3){
            	$(success_msg_path).html('<span class="red">Item already added into your wishlist</span>');
            	$(success_msg_path).css("display","block");
            }else {
                quick_popup('/customer/loginPopup/');
            }
        },
        error: function(x,y,z){
            alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
        }
    });
}


	function email_notify(){
		var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{1,4}$/;
		var emailValue = $.trim($('#email').val());
		var pid = $.trim($('#pid').val());
		if(filter.test(emailValue)){
			$.ajax({
				url:root_url+'/site_product/notify',
				data:'email='+emailValue+'&pid='+pid,
				type:'post',
				success:function(data){
					data = $.trim(data);
					if(data == 1){
						$('#email').val('');
						$('#email_notify').html('<label class="green">Email send succesfully.</label>').fadeOut(1000);
					}else{
						$('#email_notify').html('<label class="red">Try Later</label>');
					}

				},
				error:function(){
					$('#email_notify').html('<label class="red">Try Later</label>');
				}

			});
		}else{
			$('#email_notify').html('<label class="red">Wrong Email Id</label>');
			return false;
		}
	}

	$(function () {
		$(window).on('scroll', function() {
			scrollTop = $(window).scrollTop();
			if(scrollTop > 113){
                $('#floating_menu').addClass('fixed_floating');
				$('#floating_menu').removeClass('fixed_floating_more');
				$('#page_slide_navigator').css('bottom','-30px');
				$('div.navigation').removeClass('def_s_active');
				if ($("#search").is(":focus")) {
					$('div.navigation').addClass('active');
				}
				$('#search').attr('placeholder','');
			} else if(scrollTop > 30) {
				$(".hotoffer").addClass("hotoffer_sticky");
			} else{
                $('#floating_menu').removeClass('fixed_floating').removeClass('fixed_floating_more');
				$('#page_slide_navigator').css('bottom','-30px');
				$(".hotoffer").removeClass("hotoffer_sticky");
				$('#search').attr('placeholder','Search');
			}
		});
	});



	$('.quick_gal_img').click(function(e){
		e.preventDefault();
                $('#loading_img').show();
		$('#quick_large').attr('src', $(this).attr('data-large')).load(function (){ $('#loading_img').hide(); });
	});

	/*
	 * replace http query str
	 */
	 function replaceQueryString(uri,key,value) {
		 var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
		  separator = uri.indexOf('?') !== -1 ? "&" : "?";
		  if (uri.match(re)) {
		    return uri.replace(re, '$1' + key + "=" + value + '$2');
		  }
		  else {
		    return uri + separator + key + "=" + value;
		  }

		}

	 /*
	  *  remove http query str
	 */
	 function RemoveParameterFromUrl( uri, key ) {
		 	var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
		 	 separator = uri.indexOf('?') !== -1 ? "&" : "?";
		 	if (uri.match(re)) {
			    return uri.replace(re, '');

			}else {
			    return uri + separator + key + "=" + value;
			 }

	}

	 function show_tool(tip_id){
		 $('.tooltip-inner').hide();
		 $('#'+tip_id).toggle();
	 }

	 function hide_tool(){
		 $('.tooltip-inner').hide();
	 }

	  function tell_us(){
		 var url = root_url+"/customer/tellus?" + new Date().getTime();
		 	$.ajax({
					url:url,
					success:function(data){
						$('#tell_us_popup_content').html(data);
						$("#tell_us_box").fadeIn(0);
					},
					error:function(xhr, error){
						$("#tell_us_box").fadeIn(0);
						$('#tell_us_popup_content').html('Please Try Later');
					}
				});

	 }
         $(document).on('click', '#show_cod_box_yes',function(){
		$('#pin_check_result').fadeOut(200,function(){
				$('#check_cod_option').fadeIn(200);
		});
	 });
	 $(document).on('click', '#post_pincode_no',function(e){
		$('#pin_check_result,#cod_form2_confirm').fadeOut(200,function(){
				$('#check_cod_option').fadeIn(200);
		});
                e.preventDefault();
	 });
	 $(document).on('click', '#show_cod_box_no',function(){
		 $('#pin_check_result').fadeOut(200,function(){
				$('#check_cod_option').fadeIn(200);
		});
	 });

         $(document).on("keypress" ,"#cod_pincode",function(e){
	        if(e.which == 13){//Enter key pressed
	        	e.stopImmediatePropagation();
	        	checkpincode();
	        }
	   });
	  //pincode check
          $(document).on('click','#check_pin_submit',function(e){
        	  e.stopImmediatePropagation();
        	  checkpincode();
          });

          function checkpincode()
          {
              $('#cod_message').html('');
              $('.cod_error').css({'display':'none'});
			  $('#post_pincode_yes').html('');
			  $('#pincode_yes').hide();
			  $('#post_pincode_no').html('');
			  $('#pincode_no').hide();
			  $('#cod_yes').hide();
			  $('#cod_no').hide();
			  $('#serv_msg').html('');
			  var pincode           = $('#cod_pincode').val();
			  var prc_code          = $('#cod_prc_code').val();
			  var sku               = $('#cod_sku').val();
			  var supplier_id       = $('#cod_supplier_id').val();
			  var cod_exist         = $('#cod_open').val();
			  var int_ship          = $('#int_ship').val();
                          var product_id        = $('#product_id').val();
			  var cod_auction = 0,brand_id=0,assembly_check=0,new_tse=0,brand_name=0;
			  cod_auction       = $('#cod_auction').val();
                          if ($('#brand_id').length > 0){
                                brand_id          = $('#brand_id').val();
                                brand_name        = $('#brand_name').val();
                                assembly_check    = $('#assembly_check').val();
                                new_tse           = 1;
                          }
			  if(pincode === ''){
				  $('#cod_pincode').val('').addClass('required').attr('placeholder','Enter valid pincode');
				  $('.cod_error').css({'display':'block'});
				  return false;
			  }
			  if(pincode.length < 6){
				  $('#cod_pincode').val('').addClass('required').attr('placeholder','Enter valid pincode');
				  $('.cod_error').css({'display':'block'});
				  return false;
			  }
			  if(pincode.length > 8){
				  $('#cod_pincode').val('').addClass('required').attr('placeholder','Enter valid pincode');
				  $('.cod_error').css({'display':'block'});
				  return false;
			  }
			  if(isNaN(pincode)){
				  $('#cod_pincode').val('').addClass('required').attr('placeholder','Enter valid pincode');
				  $('.cod_error').css({'display':'block'});
				  return false;
			  }


			  var ajaxLoading = false;

			  if(!ajaxLoading){
				  ajaxLoading = true;
				  $.ajax({
					  url:'/pincode/is_product_serviceable',
					 data:'pincode='+pincode+'&prc_code='+prc_code+'&sku='+sku+'&supplier='+supplier_id+'&cod_exist='+cod_exist+'&int_ship='+int_ship+'&brand_id='+brand_id+'&assembly_check='+assembly_check+'&product_id='+product_id,
					 type:'post',
					  success:function(data){
						  ajaxLoading = false;
						  data = $.trim(data);
						  	try {
							  data = $.parseJSON(data);
							} catch (e) {
							    // not json
								if(data === 'pincode must be in digit'){
									$('#cod_pincode').val('').addClass('required').attr('placeholder','Enter valid pincode');
									if (new_tse === 0) {
                                                                            $('.cod_error').css({'display':'block'});
                                                                        }
									return false;
								}
							}
						  var cod_str  = '';
						  var serv_str = '';
						  if(data.cod){
							  if(data.cod === 'not available'){
								  if(cod_exist > 0 && new_tse === 0){
                                                                        $('#cod_no').show();
								  }
                                                                  cod_str = '<br />COD <span class="cod_error">Not Available</span>.';
                                                                  if (new_tse === 1) {
                                                                    cod_str = 'is <span class="red">not available</span> <br/>for your location';
                                                                    $('#cod_msg').parent().removeClass().addClass('vip_cod_summary_block cod_ch noborderright del_cancel');
                                                                  }
							  }else if(data.cod === 'available'){
								  if(cod_exist > 0 && new_tse === 0){
									  $('#cod_yes').show();
								  }
                                                                  cod_str = '<br /> COD <span class="green">Available</span>.';
                                                                  if (new_tse === 1) {
                                                                    cod_str = 'is <span class="green">available</span> <br/>for your location';
                                                                    $('#cod_msg').parent().removeClass().addClass('vip_cod_summary_block cod_ch noborderright del_check');
                                                                  }
							  }
						  }
						  if(data.serviceable){
							  if(data.serviceable === 'not available'){
                                                              serv_str = '<span class="red">can\'t be Delivered</span>';
                                                              if (new_tse === 1) {
                                                                serv_str = 'This item <span class="red">can\'t be <br/>Delivered</span> to your location';
                                                                $('#serv_msg').parent().removeClass().addClass('vip_cod_summary_block delivery_ch del_cancel');
                                                                $('#pin_check_result').addClass('no_deliverability');
                                                                $('#delivery_block').hide();
                                                                $('#no_delivery_block').show();
                                                              }
							  }else if(data.serviceable === 'available'){
                                                              serv_str = 'can be <span class="green">Delivered</span>';
                                                              if (new_tse === 1) {
								serv_str = 'This item can be <br/><span class="green">Delivered</span> to your location';
                                                                $('#serv_msg').parent().removeClass().addClass('vip_cod_summary_block delivery_ch del_check');
                                                                $('#pin_check_result').removeClass('no_deliverability');
                                                                $('#no_delivery_block').hide();
                                                                $('#delivery_block').show();
                                                              }
							  }
						  }

                                                  if(data.assembly){
                                                        var assembly_not_provided_msg = '<a href="javascript://">Assembly required, to be arranged by yourself\n\
                                                                                            <div id="no_assembly_tip">\n\
                                                                                                <span class="international-price tooltip-inner lfbt">\n\
                                                                                                    We\'re unable to provide assembly services for this pincode. You\'ll need to make offline arrangements for this item.\n\
                                                                                                    <span class="tip"></span>\n\
                                                                                                </span>\n\
                                                                                            </div>\n\
                                                                                        </a>';
                                                          if(data.assembly === 'available_by_pepperfry' && (assembly_check === '2' || assembly_check === '1')) {
                                                                assembly = '<span class=\"green\">Provided</span> by Pepperfry';
                                                                $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_check');
                                                          }
							  else if(data.assembly === 'not available' && assembly_check === '1'){
								assembly = assembly_not_provided_msg;
                                                                $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_no_ass');
							  }else if(data.assembly === 'available' && assembly_check === '1'){
								assembly = '<span class=\"green\">Provided</span> by Pepperfry';
                                                                $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_check');
							  }else if(data.assembly === 'not available' && assembly_check === '2'){
								assembly = assembly_not_provided_msg;
                                                                $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_no_ass');
							  }else if(data.assembly === 'available' && assembly_check === '2'){
                                                                assembly = '<span class=\"green\">Provided</span> by '+brand_name;
                                                                $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_check');
							  }else if(assembly_check === '3'){
                                                                assembly = 'Simple Assembly, Can be managed by Self';
                                                                $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_exclamation');
							  }else if(assembly_check === '4'){
                                                                assembly = 'No Assembly Required';
                                                                $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_check');
							  }else {
                                                                assembly = '';
                                                                $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch');
                                                          }
						  }
                                                  if(data.delivery_date && data.serviceable === 'available'){
                                                      $('#delivery_by,#order_today_delivery_msg span').html(data.delivery_date);
                                                      $('#order_today_ship_msg,#order_today_no_delivery_msg').hide();
                                                      $('#delivery_timeline_wrapper,#order_today_delivery_msg').show();
                                                  } else if (data.serviceable === 'not available') {
                                                      $('#delivery_timeline_wrapper,#order_today_delivery_msg,#order_today_ship_msg').hide();
                                                      $('#order_today_no_delivery_msg').show();
                                                  } else {
                                                      $('#delivery_timeline_wrapper,#order_today_delivery_msg,#order_today_no_delivery_msg').hide();
                                                      $('#order_today_ship_msg').show();
                                                  }
                                                  if (new_tse === 0)
                                                  {
                                                      $('#check_cod_option').fadeOut(200, function(){
                                                              if(cod_auction == 1){
                                                                      if(data.serviceable == 'available'){
                                                                              $('#cod_msg').html('Please note that this item <strong>can be delivered</strong> to: <a href="javascript:void(0);" id="show_cod_box_yes"><u>'+pincode+'</u> <img width="13" align="absmiddle" height="12" src="http://cw.pepperfry.com/img/edit_icon.png"></a>');
                                                                      }else{
                                                                              $('#cod_msg').html('Please note that this item <strong>cannot be delivered</strong> to: <a href="javascript:void(0);" id="show_cod_box_yes"><u>'+pincode+'</u> <img width="13" align="absmiddle" height="12" src="http://cw.pepperfry.com/img/edit_icon.png"></a>');
                                                                      }

                                                              }else if(data.serviceable == 'not available'){
                                                                      $('#serv_msg').html(serv_str);
                                                                      $('#msg_for_to').html(' to:');
                                                                      $('#cod_msg').hide();
                                                              }else{
                                                                      $('#serv_msg').html(serv_str);
                                                                      $('#cod_msg').html(cod_str);
                                                                      $('#msg_for_to').html(' to:');
                                                                      $('#cod_msg').show();
                                                              }
                                                              $('#post_pincode_no').html(pincode);
                                                              $('#serv_msg').show();
                                                              $('#pin_check_result').fadeIn();
                                                      });
                                                  } else
                                                  {
                                                      $('#check_cod_option').fadeOut(200, function(){
                                                              $('#serv_msg').html(serv_str);
                                                            if (cod_exist > 0){
                                                                $('#cod_msg').html(cod_str);
                                                            }
                                                              $('#assembly_msg').html(assembly);
                                                              $('#cod_msg').show();
                                                              $('#post_pincode_no').html(pincode);
                                                              $('#serv_msg').show();
                                                              if($('#cod_form2_confirm').hasClass('arrow_none'))
                                                              {
                                                                $('#cod_form2_confirm').removeClass('arrow_none');
                                                              }
                                                              $('#cod_form2_confirm').fadeIn();
                                                              $('#pin_check_result').fadeIn();
                                                      });
                                                  }

                                         _gaq.push(['_trackEvent', 'VIP', 'Click', 'Pincode check',, true]);
					  },error:function(){
                                                  alert('error');
						  ajaxLoading = false;
						  if (new_tse === 0)
                                                  {
                                                      $('#cod_message').html('<span class="red">please try later</span>');
                                                      $('.cod_error').css({'display':'block'});
                                                  }
					  }
				  });
			  }
			  return false;
     }

	 function close_tell_us_bar(){
		 $(".top_notification").slideUp('slow');
		 var path = ('https:' == document.location.protocol ? 'https://' : 'http://')+server_name+"/customer_account/tellus_process";

			$.ajax({
				url: path,
				data:{key :1},
				dataType:"json",
		        type: "POST",
		        success: function(data){

		        		},
		        error: function(data){
		        			return false;
		        		}
			});
	 }

	function fbs_click()
	{
		u=location.href;
		t=document.title;window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
		return false;
	}
	function redirect_page(url){
	window.location = url;
	}


	//work : this function use to show the reg model - specially created for handling the OTP box
	function openModel(show_id,hide_id)
	{
		if(hide_id!='undefined' && hide_id!='')
		{
			$('#'+hide_id).hide();
		}

		if(typeof(otp_register)!='undefined' && otp_register==true)
		{
			$('#change_number_form').hide();
			$('#auth_form').show();
			$('#otp_box').fadeIn(50);
			$('#otp_box #otp_code').val('');
		}
		else
		{
			$('#'+show_id).fadeIn(50);
		}
	}

	function closeOTP()
	{
		_gaq.push(['_trackEvent', 'RegOTP', 'Close', 'Non_checkout',, true]);
		$('#otp_box').hide();
	}


	function createCookie(name,value,days)
	{
		var expires = "";
		if(days == '-1')
		{
			expires=0;
		}
		else if (days)
		{
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}

		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name)
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ')
			{
				c = c.substring(1,c.length);
			}

			if (c.indexOf(nameEQ) == 0)
				return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(name)
	{
		createCookie(name,"",-1);
	}

	/*
	  * Code for Out of stock notifications
	*/

		$('#notification_status').click(function(){
			if ($(this).is(':checked')){
				$('#oos_notification_form').show();
			}else{
				$('#oos_notification_form').hide();
			}
		});


		$('#notify_email,#notify_email_2,#cod_input_1').focus(function(){
			$(this).removeClass('required');
		});

		$('.moreby_brand').click(function(){
			window.location = this.id;
		});

		function oosNotification_vip(product_id,email_id_from){
			value_from = '#'+email_id_from;
			var filter = /^[a-zA-Z0-9._-]+@([0-9a-z][0-9a-z.-]+\.)+[a-zA-Z]{2,4}$/i;
			var emailValue = $.trim($(value_from).val());
			if(filter.test(emailValue) != true )
			{
				$('#notify_email').val('').addClass('required').attr('placeholder','Invalid Email');
				$('#notify_email_2').val('').addClass('required').attr('placeholder','Invalid Email');
			}else
			{
				//goint to submit notification request in database
				$.ajax({
					url:root_url+'/site_product/oos_notifciation_request',
					data:'email='+emailValue+'&pid='+product_id,
					type:'post',
					success:function(data){
							if(data == "Success"){
								$('#notify_form_wrap').css("display","none");
								$('#notify_form_2').css("display","none");
								$('#availability_message').css("background","none");
								$('#availability_message').html('Thank you, we\'ll let you know once it\'s back in stock.');
								$('#oos_notify_subtitle_id').html('Thank you, we\'ll let you know once it\'s back in stock.');
                                                                _gaq.push(['_trackEvent', 'VIP', 'Submit', 'Notify Me',, true]);
							}else{
								$('#notify_form_wrap').css("display","none");
								$('#notify_form_2').css("display","none");
								$('#availability_message').html('There is some error, please try again later.');
								$('#oos_notify_subtitle_id').html('There is some error, please try again later.');
							}
					},
					error:function(){
							$('#notify_form_wrap').hide();
							$('#notify_form_2').hide();
							$('#availability_message').html('There is some error, please try again later.');
							$('#oos_notify_subtitle_id').html('There is some error, please try again later.');
					}
				});
			}

		}

		function toggleShare(e, flag) {
			if(flag == 1) {
				$(e).find('.clip_share').show();
				$(e).find('.details_container').addClass('selected');
			} else {
				$(e).find('.clip_share').hide();
				$(e).find('.details_container').removeClass('selected');
			}
		}
		function addSeparatorsNF(nStr, inD, outD, sep)
		{
			nStr += '';
			var dpos = nStr.indexOf(inD);
			var nStrEnd = '';
			if (dpos != -1) {
				nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
				nStr = nStr.substring(0, dpos);
			}
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(nStr)) {
				nStr = nStr.replace(rgx, '$1' + sep + '$2');
			}
			return nStr + nStrEnd;
		}
		var sterm, fterm, regX;
		var isHoverSelect = false;
		$("#search").autocomplete({
		    delay: 0,
		    minLength: 3,
		    source: root_url+"/site_product/product_search/",
		    select: function(event, ui) {
		    	if($('a.ui-state-focus').find('.pop_prod_item').length > 0){
		    		window.location = $('a.ui-state-focus').find('.pop_prod_item').attr('rel');
		    		return false;
		    	}else{
		    		//if($('a.ui-state-focus').find('.sugg_heading').length > 0){
		    		if($('a.ui-state-focus').find('.noselect').length > 0){
		    			if($('a.ui-state-focus').find('.noselect.category').length > 0 || $('a.ui-state-focus').find('.noselect.brands').length > 0){
		    				//if(ui.item.hasOwnProperty('type')) {
		    					//$('#in_which').val(ui.item.type);
		    					//$("#og_search_term").val(ui.item.label);
		    				//}
		    				$("#search").val(ui.item.label);
		    				if(ui.item.hasOwnProperty('category_id')) {
		    					$('#cat').val(ui.item.category_id);
	    					}
		    				$('#search_mini_form').submit();
		    			}
		    			return false;
		    		}else{
		    			/*regX = /(<([^>]+)>)/ig;
		    			sterm = ui.item.label;
		    			fterm = sterm.replace(regX, "");
		    			alert(fterm); return false;
		    			//$('#search').val(fterm);*/
		    			$('#search_mini_form').submit();
		    		}
		    	}
		    	return false;
		    },
		    focus: function(event, ui) {
		    	if (typeof event.keyCode === 'undefined' || event.keyCode == 0) {
		    		isHoverSelect = true;
			    } else {
			    	isHoverSelect = false;
			    	if($('a.ui-state-focus').find('.noselect').length > 0){
			    		//$("#in_which").val("");
			    		//$("#in_which").val(ui.item.label);
			    		return false;
			    	}else{
			    		$("#search").val(ui.item.label);
			    		if(ui.item.hasOwnProperty('category_id')) {
	    					$('#cat').val(ui.item.category_id);
    					}
			    	}
			    }
		        return false; // Prevent the widget from inserting the value.
		    }
		}).data("ui-autocomplete")._renderItem = function (ul, item) {
			$("#cat").val("");
			return $("<li></li>")
		    	.data("item.autocomplete", item)
		        .append("<a>" + item.value + "</a>")
		        .appendTo(ul);
		};

		function showFullName(id){
			id = $.trim(id);
			var full_name_id = '#full-name_'+id;
			var short_name_id = '#short-name_'+id;
			//$(short_name_id).css("display","none");
			//$(full_name_id).css("display","block");
			$(full_name_id).fadeIn("fast");
		}
		function showShortName(id){
			id = $.trim(id);
			var full_name_id = '#full-name_'+id;
			var short_name_id = '#short-name_'+id;
			//$(full_name_id).css("display","none");
			$(full_name_id).fadeOut("fast");
			//$(short_name_id).css("display","block");
		}

		$(".tooltip_atc").hover(function(){
			$(this).prev().css("display","block");
		},function(){
			$(this).prev().hide();
		});

                $('.video_thumb').click(function(e){
                    var video_url = $('.video_thumb a').data('iframeid');

                    $('#vid').css('display','block');
                    $('#video_container iframe').replaceWith(video_url);
                    $('#video_container iframe').css({'width':'560', 'height':'315'});
                    e.preventDefault();

                });
                $('#close_video').click(function(){
                        $('#video_container iframe').attr('src', '');
                        $('#vid').css('display','none');
                });

