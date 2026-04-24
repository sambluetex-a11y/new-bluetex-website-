if (typeof isSellUpjs__running === 'undefined') {
      
  var template_name = __st.p;
  var page_url = __st.pageurl;
  var thank_you_page = page_url.includes("thank_you");
  var order_preview_page = page_url.includes("orders");
  var cartredirection_whenupsellupgrade = false;
  var is_action_offers_available = true;
  var compact_mode_offers_data = {};
  var product_selling_plan_value;
  var launchtip_frequent_bounght = "false";
  var selling_plan_id;
  var main_cartdrawerInterval = null;
  var script_featherlight_has_created = false;
  setTimeout(console.log.bind(console, 'Add Ons, Cross-sells and Upsells powered by SellUp - Visit %c%s for more info.', '', 'https://www.launchtip.com/sellup'));

        function hasPopupCart() {
          const popupSelectors = [
            '.cart-popup',
            '[data-cart-popup]',
            '.cart-modal',
            '.modal-cart',
            '.popup-cart',
            '.cart-overlay',
            '.cart-popup-wrapper',
            '.fancybox-cart',
            '.lightbox-cart',
            '#cart-popup',
            '.cart-notification-popup',
            '.cart-notification-wrapper',
            '.cart-preview',
            '.cart-notification__container',
              '.mini-cart-content',
              '.mini-cart__inner',

          ];
          
          return popupSelectors.some(selector => document.querySelector(selector));
        }

        function cartdrawer_value(){
          (function($) {
            var cart_type = hasPopupCart() ? 'popup' : 'drawer';
            if (cart_type !== 'popup') {
              var carosal_add_to_cart = "false";
              var $cart_drawer_selector = $('button,input[type="submit"][name="checkout"],button[aria-label="Check out"],button[type="submit"],a[href*="/cart"],button[type="submit"][name="checkout"]').filter(function () {
                return $(this).text().toLowerCase().includes('checkout') || ($(this).attr('name') && $(this).attr('name').toLowerCase().includes('checkout') || $(this).attr('aria-label') && $(this).attr('aria-label').toLowerCase().trim().includes('check out'));
              });
              if ($cart_drawer_selector.length) {
                var $parentDiv = $cart_drawer_selector.closest('div').parent();
                if ($parentDiv.is('body') || $parentDiv.hasClass('drawer__content') || $parentDiv.hasClass('cart-drawer')) {
                  $parentDiv = $cart_drawer_selector.closest('footer');
                    if( $parentDiv.length === 0 && Shopify.theme.theme_store_id != '1190'){ //impact theme
                      $parentDiv = '';
                    }else{
                      $parentDiv = ($parentDiv.hasClass('mini-cart__drawer-footer')) ? $parentDiv : $cart_drawer_selector.closest('div');
                    }
                

                }else{
                  if(Shopify.theme.theme_store_id == '833'){
                    $parentDiv = $('.cart--body');
                  }
                }
                var shop_name = Shopify.shop;
                if(!script_featherlight_has_created){
                  var script = document.createElement('script'); 
                  document.head.appendChild(script);  
                  script.type = 'text/javascript';
                  script.src = "//cdn.jsdelivr.net/npm/featherlight@1.7.14/release/featherlight.min.js";
                  $('head').append('<link type="text/css" href="https://sellup.herokuapp.com/kartifyjs/launchtipcartdrawer.css" rel="stylesheet">');
                  $('head').append('<link type="text/css" href="https://sellup.herokuapp.com/upseller/upseller.css?' + Math.random() + '" rel="stylesheet">');
                    const mediaQueryCSS = `
                      @media only screen and (max-width: 370px) and (max-height: 740px) {
                        .item.productbox.launchtip_cart_upsell_product_in_drawer {
                          width: 310px !important;
                        }

                        .details.launchtip_cart_drawer_product_title {
                          min-width: 190px !important;
                        }
                      }
                      @media only screen and (max-width: 344px) and (max-height: 882px) {
                          .item.productbox.launchtip_cart_upsell_product_in_drawer {
                            width: 290px !important;
                          }

                          .details.launchtip_cart_drawer_product_title {
                            min-width: 180px !important;
                          }
                        }
                    `;
                    const styleTag = document.createElement('style');
                    styleTag.innerHTML = mediaQueryCSS;
                    document.head.appendChild(styleTag);
                    script_featherlight_has_created = true;
                }

                  $.ajax({
                    dataType: 'json',
                    async: false, 
                    url: '/cart.js',
                    success: function(data) {
                      if (data['items'].length != 0) {
                        arr = [];
                        $.each(data["items"], function( key, value ) {
                          arr.push(value.product_id)
                        })
                        // items_ids = JSON.stringify(arr);
                        items_ids = arr;
                        if (items_ids != undefined) {
                          var url = "https://sellup.herokuapp.com/output/cart_view.json?shop=" + shop_name + "&items=" + encodeURIComponent(JSON.stringify(items_ids));
                        }
                        // --------------------------end-------------------------
                        $.ajax({
                          url: url,
                          dataType: 'json',
                          success: function(data) {
                            function cartupsells_viewcount(){
                              if(data["cart_upsells_found_or_not"] == true || data["upcart_heading"]["default_cart_use"] != 'auto'){
                                // console.log('%ccart upsells found!', 'color: green;');
                                var sellup_ids = []
                                var cartupsell_pids = []
                                $.each( data["default_cart_upsell"], function( index, value ){
                                  sellup_ids.push(value['sellup_id'])
                                  cartupsell_pids.push(value['id'])
                                });
                                sellup_ids = [...new Set(sellup_ids)];
                                // console.log(sellup_ids);
                                // console.log(cartupsell_pids);
                                var token1 = generateToken();
                                var sub_url = 'https://analytics-sellup.herokuapp.com';
                                if(sellup_ids.length != 0){
                                  $.each( sellup_ids, function(index, value){
                                    if(value != ""){
                                      var url_ind_pr = 'https://sellup.herokuapp.com/output/individual_detail.json?sellup_id='+value;
                                      $.ajax({
                                        crossOrigin: true,
                                        url: url_ind_pr,
                                        success: function(data) {
                                          var cartupsell_viewedpids = []
                                          $.each(data["ind_upsell_data"], function(index, item) {
                                            $.each(cartupsell_pids, function(index1, item1) {
                                              if (item == item1){
                                                // data["ind_upsell_data"].splice(index , 1);
                                                cartupsell_viewedpids.push(item)
                                              }
                                            });
                                          });
                                          // console.log('data')
                                          // console.log(cartupsell_viewedpids)
                                          // console.log(value)
                                          $.post( sub_url+'/upsell_views',{ shop: shop_name, visit_token: token1,visitor_token: token1,event_type: "$view", sellup_id: value, ind_upsell_data: cartupsell_viewedpids, time: Math.round(+new Date()/1000) }).always(function() {
                                          });
                                        }
                                      });
                                    }else{

                                    }
                                  });
                                }
                              }else{
                                // console.log('Recommendation products are appearing!')
                                var token1 = generateToken();
                                var sub_url = 'https://analytics-sellup.herokuapp.com'
                                var cartupsell_pids = []
                                $.each( data["default_cart_upsell"], function( index, value ){
                                  cartupsell_pids.push(value['id'])
                                });

                                $.post( sub_url+'/upsell_views',{ shop: shop_name, visit_token: token1,visitor_token: token1,event_type: "$view", sellup_id: '', ind_upsell_data: cartupsell_pids, time: Math.round(+new Date()/1000) }).always(function() {
                                });
                              }
                            }

                            function generateToken() {
                              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                                return v.toString(16);
                              });
                            }

                            function main_success() {
                              setting = data["settings"];
                              var cartstyle='';
                              var button_class='';
                              // if (theme_name == 'Dawn'){
                                cartstyle = 'display: flex;flex-direction: column;';
                                button_class = 'button Button button-primary';
                              // }

                              var pricestylestoapply = '';
                              var pricestyletoapply = '';
                              var comppricestyletoapply = '';

                              pricestylestoapply = 'display: flex;justify-content: center;';
                              if(data["settings"]["up_price_font_size"] != ''){
                                  pricestylestoapply += 'font-size:'+data["settings"]["up_price_font_size"]+'px;'
                              }
                              if(data["settings"]["up_price_font_color"] != ''){
                                  pricestyletoapply += 'color:'+data["settings"]["up_price_font_color"]+' !important;';
                                  pricestyletoapply += 'font-size:'+data["settings"]["up_price_font_size"]+'px;'
                              }
                              if(data["settings"]["up_comp_price_font_color"] != ''){
                                  comppricestyletoapply += 'color:'+data["settings"]["up_comp_price_font_color"]+';';
                                  comppricestyletoapply += 'font-size:'+data["settings"]["up_price_font_size"]+'px;'
                                  comppricestyletoapply += 'margin-right: 10px;'
                              }
                            
                              var status = data["success"];
                              if(status == true){
                                  var producthtml = function(productdetail,count,cart_upsell_no,selected_id,sellup_id,ind_product_id){

                                      var prod = null;
                                      $.ajax({
                                          dataType: 'json',
                                          async: false, 
                                          url: window.Shopify.routes.root + 'products/' + productdetail + '.js',
                                          success: function(product) {
                                            prod = product;    
                                          },
                                          error: function() {
                                              var url1 = base_url + '/output/upsell_offer_product_data.json?shop=' + shop_name + '&product_id=' + ind_product_id;
                                              var shop_locale = Shopify.locale
                                                $.ajax({
                                                  dataType: 'json',
                                                  async: false,
                                                  url: url1,
                                                  data: {
                                                    shop_locale: shop_locale
                                                  },
                                                  success: function(product) {
                                                    product_data = product.upsell_offer_product;
                                                    translate_handle = product.translated_handle;
                                                    let handle1 = translate_handle || product_data.handle;
                                                    $.ajax({
                                                      dataType: 'json',
                                                      async: false,
                                                      url: window.Shopify.routes.root + 'products/' + handle1 + '.js',
                                                      success: function(product) {
                                                        prod = product;
                                                        
                                                      },
                                                        error: function() {
                                                        }
                                                    });

                                                  },
                                                  error: function() {
                                                  }
                                                })
                                          }
                                      })
                                            
                                      if(prod == null){
                                          return ''
                                      }
                                      else{
                                          var vcount = $.map(prod["variants"], function(n, i) { return i; }).length; 

                                          // -----------------start here--------------
                                          if (selected_id != '' && selected_id != undefined){
                                            var selected_variant = $.grep(prod["variants"], function (element, index) {return element.id == selected_id && element.available; })[0];
                                            if(!selected_variant){
                                             return '';
                                            }

                                            if(typeof selected_variant !== 'undefined' && typeof selected_variant["featured_image"] !== 'undefined' && selected_variant["featured_image"] != null){
                                              var selected_variant_img = selected_variant["featured_image"]["src"] || selected_variant["featured_image"]["url"];
                                            }
                                            else{
                                              var selected_variant_img = prod["featured_image"];
                                            }
                                            var firstvariantprice = selected_variant["price"];
                                            var firstvariantcprice = selected_variant["compare_at_price"];
                                          }
                                          else{
                                            var selected_variant = prod["variants"][0]
                                            var selected_variant_img = prod["featured_image"];
                                            if (vcount == 1){
                                              var selected_id = selected_variant["id"]
                                            }else{
                                              var selected_id = "";
                                            }
                                            var firstvariantprice = prod["variants"][0]["price"];
                                            var firstvariantcprice = prod["variants"][0]["compare_at_price"];
                                          }
                                          // if (typeof selected_variant === 'undefined'){
                                          //   var selected_variant = prod["variants"][0]
                                          // }
                                          
                                          // ------------------end---------------


                                          var cp_html = '';     
                                          if((firstvariantcprice) && (firstvariantcprice != '') && (firstvariantcprice > firstvariantprice)){
                                              if(Shopify.currency['active'] == 'CLP'){
                                                  var firstvariantcprice = Shopify.formatMoneySellUp(firstvariantcprice);
                                                  firstvariantcprice = firstvariantcprice.substring(0, firstvariantcprice.length - 3);
                                                  firstvariantcprice = firstvariantcprice.replace(",", ".");
                                                  //final_price_v = final_price_v/1000;
                                              }else{
                                                  var firstvariantcprice = Shopify.formatMoneySellUp(firstvariantcprice);
                                              }
                                              cp_html = '<span class="compareprice launchtip_price" style="justify-content: center; text-decoration: line-through;'+comppricestyletoapply+'">'+firstvariantcprice+'</span>'
                                          }else{
                                            cp_html = '';
                                          }
                                          var addcart_text = data["settings"]["cart_upsell_addcart"];
                                          if(addcart_text != "" && addcart_text != null){

                                          }else{
                                              addcart_text = 'Add To Cart'
                                          }
                                          if (selected_id != '' && selected_id != undefined) {
                                            if(Shopify.currency['active'] == 'JPY'){
                                                var final_price_v = Shopify.formatMoneySellUp(selected_variant["price"]);
                                                final_price_v = final_price_v.substring(0, final_price_v.length - 3);
                                            }else if(Shopify.currency['active'] == 'CLP'){
                                                var final_price_v = Shopify.formatMoneySellUp(selected_variant["price"]);
                                                final_price_v = final_price_v.substring(0, final_price_v.length - 3);
                                                final_price_v = final_price_v.replace(",", ".");
                                                //final_price_v = final_price_v/1000;
                                            }else{
                                                var final_price_v = Shopify.formatMoneySellUp(selected_variant["price"]);
                                            }
                                          }else{
                                            if(Shopify.currency['active'] == 'JPY'){
                                                var final_price_v = Shopify.formatMoneySellUp(prod["price"]);
                                                final_price_v = final_price_v.substring(0, final_price_v.length - 3);
                                            }else if(Shopify.currency['active'] == 'CLP'){
                                                var final_price_v = Shopify.formatMoneySellUp(prod["price"]);
                                                final_price_v = final_price_v.substring(0, final_price_v.length - 3);
                                                final_price_v = final_price_v.replace(",", ".");
                                                //final_price_v = final_price_v/1000;
                                            }else{
                                                var final_price_v = Shopify.formatMoneySellUp(prod["price"]);
                                            }
                                          }
                                          var popup_heading_text_value = data["settings"]["popup_heading_text"];
                                          var btnstyletoapply = '';
                                          var btnstyletoapply_drawer = '';
                                          if(data["settings"]["up_button_font_size"] != ''){
                                            btnstyletoapply += 'font-size:'+data["settings"]["up_button_font_size"]+'px;';
                                          }

                                          if(data.settings?.up_button_font_size){
                                            btnstyletoapply_drawer += 'font-size:'+data["settings"]["up_button_font_size"]+'px;';
                                          }else{
                                            btnstyletoapply_drawer += 'font-size:16px;';
                                          }

                                          
                                          

                                          if(data.settings?.up_button_font_color){
                                            
                                            btnstyletoapply_drawer += 'color:' + data["settings"]["up_button_font_color"] + ';';
                                            
                                            
                                          }else{
                                            btnstyletoapply_drawer += 'color: #ffffffff;';
                                           
                                          }
                                          if(data.settings?.up_button_bg_color){
                                            
                                            
                                            btnstyletoapply_drawer += 'background-color:' + data["settings"]["up_button_bg_color"] + ';';
                                            
                                          }else{
                                            btnstyletoapply_drawer += 'background-color: #080808ff;';
                                           
                                          }


                                          //Variant based code start/.///////////////////////

                                          var link_html='';
                                          var vhtml= '';
                                          var voption1 = '';
                                          var vselectlist = '';
                                          var main_price = (Math.round(selected_variant['price']) / 100).toFixed(2);
                                          
                                            if(selected_id == ''){
                                              // selected_id = prod["variants"][0]["id"]
                                              $.each(prod["variants"], function( key, value ) {
                                                  voption1 += '<option value="'+value.id+'">'+value.title+'</option></option>'
                                              })

                                              vselectlist = '<select name="id" class="launchtip_select_wrapper" style="display:none;">'+voption1+'</select>'
                                              var allprodoption = '';
                                              $.each(prod["options"], function( key, value ) {
                                                  var voptionlist = '';   
                                                  var select_lable = "<label>"+value.name+"</label>";
                                                  $.each(value["values"], function( key1, val ) {
                                                    voptionlist += '<option value="'+val+'">'+val+'</option>'
                                                  })

                                                  voptionselectlist = '<div class="launchtip_select_option_wrapper">'+select_lable+'<select class="launchtip_select_option_list">'+voptionlist+'</select></div>'
                                                  allprodoption += voptionselectlist
                                              })
                                              var selling_plan_field = (prod["selling_plan_groups"].length > 0) ? 
                                              '<input type="hidden" name="selling_plan" value="' + prod["selling_plan_groups"][0]["selling_plans"][0]["id"] + '">' : '';
                                              var popupform = '<div class="LaunchTipAddToCartForm launchtipsellupform" enctype="multipart/form-data">\
                                              <div class="provariantdata" style="display:none;">'+JSON.stringify(prod)+'</div>\
                                              <div class="popupmsg" style="height:0;"></div>\
                                              <div class="popuppricediv">'+final_price_v+'<input type="hidden" value="'+main_price+'" class="main_price"></div>\
                                              '+vselectlist+'<div class="launchtip_select_options_div">'+allprodoption+'</div><input type="hidden" name="quantity" value="1"><input type="hidden" name="properties[_sellup_id]" value="'+sellup_id+'">\
                                              '+selling_plan_field+'\
                                              <button type="submit" name="add" ind_product_id="'+prod['id']+'" sell-id="'+sellup_id+'" class="btn add-to-cart launchtip_cartdrawer_add_to_cart launchtip_upsellpopup_design" style="'+btnstyletoapply+'border: none;cursor: pointer;width: 100%;" ><span class="add-to-cart__text" data-text="'+addcart_text+'">'+addcart_text+'</span></button>\
                                              </div>';
                                              
                                          }else{
                                          }

                                          if (vcount > 0 || selected_id != '') {
                                              vhtml = '<input type="hidden" name="id" value="'+selected_id+'">'
                                          }else{
                                              var voption = '';
                                              $.each(prod["variants"], function( key, value ) {
                                              voption += '<option value="'+value.id+'">'+value.title+'</option></option>';
                                              })
                                              vhtml = '<select name="id" class="launchtip_select_wrapper">'+voption+'</select>';
                                          }

                                            if(vcount > 0 ) {
                                              if (selected_id != '' && selected_id != undefined) {
                                                link_html = '<div class="LaunchTipAddToCartForm" enctype="multipart/form-data">' +
                                                                '<input type="hidden" name="id" value="' + selected_id + '">' +
                                                                '<input type="hidden" name="properties[_sellup_id]" value="' + sellup_id + '">' +
                                                                '<input type="hidden" value="' + main_price + '" class="main_price">' +
                                                                '<button type="submit" name="add" ind_product_id="' + prod["id"] + '" sell-id="' + sellup_id + '" id="AddToCart1" class="btn launchtip_cartdrawer_add_to_cart launchtip_upsell_design add-to-cart" style=" font-size: 12px!important; border: none;cursor: pointer;float: none; '+btnstyletoapply_drawer+'">' +
                                                                  '<span>' + addcart_text + '</span>' +
                                                                '</button>' +
                                                              '</div>';
                                              }else{
                                                link_html = '<div class="LaunchTipAddToCartForm" enctype="multipart/form-data">\
                                                              <input type="hidden" name="id" value="'+prod["variants"][0]["id"]+'">\
                                                              <input type="hidden" name="properties[_sellup_id]" value="'+sellup_id+'"><input type="hidden" value="'+main_price+'" class="main_price">\
                                                                <button type="submit" name="add" ind_product_id="' + prod["id"] + '" sell-id="' + sellup_id + '" id="AddToCart1" class="btn launchtip_cartdrawer_add_to_cart launchtip_upsell_design add-to-cart" style="' + btnstyletoapply_drawer + 'border: none; font-size: 12px!important;cursor: pointer;float: none;">' +
                                                                  '<span>' + addcart_text + '</span>' +
                                                                '</button>' +
                                                              '</div>';
                                              }
                                            }

                                          if (vcount > 1 && selected_id == ''){
                                           var finalhtml_button = '<button class="btn openbox launchtip_upsell_design" style="'+btnstyletoapply_drawer+'  font-size: 12px!important;border: none;cursor: pointer;float: none;" href="#fl'+count+cart_upsell_no+'"><span class="add-to-cart__text">'+addcart_text+'</span></button>';
                                          }
                                          else{
                                              var finalhtml_button = link_html;
                                          }

                                          var var_in_stock = false;
                                          $.each(prod["variants"], function( key, value ) {
                                            if(value.available == true){
                                              var_in_stock = true;
                                            }
                                          })
                                          if (vcount == 1 && var_in_stock == false) {
                                              return '';
                                          }else if(vcount > 1 && var_in_stock == false){
                                              return '';
                                          }else{
                                            var product_image_container = '<div class="image" style="overflow: hidden; flex-shrink: 0; width: 70px; margin-right: 20px; border-radius: calc(var(--block-border-radius, 16px) / 2);">\
                                                <a href="'+window.Shopify.routes.root+'products/'+prod["handle"]+'">\
                                                  <img style="display: inline-block; vertical-align: middle; max-width: 100%; height: auto;" width="549" height="549" src="'+prod["featured_image"]+'" alt="'+prod["title"].replace(/"/g, '').replace(/'/g, '')+'" />\
                                                </a>\
                                              </div>';
                                            if (selected_variant_img == null) {
                                              product_image_container = "";
                                            }

                                            return '<div id="product-' + prod["handle"] + '" class="item productbox launchtip_cart_upsell_product_in_drawer upsellproductcount' + count + '" style="border: 1px solid var(--color-border, #dadce0); padding: 10px; display: inline-flex; align-items: center;  width: 340px; max-width: 100%; position: relative; background: var(--color-product-card-bg, #fff); border-radius:10px;">' + 
                                              product_image_container + 
                                              '<div class="details launchtip_cart_drawer_product_title" style="font-size:.75rem;min-width: 215px; cursor: pointer;">' + 
                                                '<a href="' + window.Shopify.routes.root + 'products/' + prod["handle"] + '" style=" display: block; font-size: calc(var(--font-product-title-scale, 1) * 0.875rem); line-height: calc(var(--font-product-title-line-height-scale, 1) * 1.4); font-weight: var(--font-body-medium-weight, 500); margin-bottom: 3px; text-decoration: none; font-weight: 500; font-size: ' + 
                                                  (data["settings"]["title_font_size"] ? data["settings"]["title_font_size"] + 'px' : '14px') + 
                                                  '; color:' + data["settings"]["up_title_font_color"] + '">' + 
                                                  '<span class="title">' + prod["title"] + '</span></a>' + 
                                                '<div style="justify-content:space-between; display:flex;">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + final_price_v + '</span>' + finalhtml_button + '</div>' + 
                                                '<div class="launchtip_upsell_lightbox launchtiplightbox upsell_variants" id="fl' + count + cart_upsell_no + '">' + 
                                                  '<h3>' + popup_heading_text_value + '</h3>' + 
                                                  '<div class="lbimg">' + 
                                                    (selected_variant_img 
                                                      ? '<img style="max-width: 250px;height: auto;width:100%;margin: auto;display: block;" class="lightboximage" src="' + selected_variant_img + '" alt="' + prod["title"].replace(/"/g, '').replace(/'/g, '') + '" />' 
                                                      : ''
                                                    ) + 
                                                    popupform + 
                                                  '</div>' + 
                                                '</div>' + 
                                              '</div>' + 
                                            '</div>';

                                          }
                                      }
                                  }
                              }       
                              var upsell_display_product_count = 0;
                              if (data["default_cart_upsell"][0] != undefined){
                                  upsell_display_product_count = upsell_display_product_count+1;
                              }
                              if(data["default_cart_upsell"][1] != undefined){
                                  upsell_display_product_count = upsell_display_product_count+1;
                              }
                              if(data["default_cart_upsell"][2] != undefined){
                                  upsell_display_product_count = upsell_display_product_count+1;
                              }
                              var upsellproducts = ''
                              if (data["default_cart_upsell"][0] != undefined){
                                  var cart_upsell_no = 1;
                                  var firstproduct = producthtml(data["default_cart_upsell"][0]["handle"],upsell_display_product_count,cart_upsell_no,data["default_cart_upsell"][0]["v_id"],data["default_cart_upsell"][0]["sellup_id"],data["default_cart_upsell"][0]["id"])
                                  upsellproducts += firstproduct;
                                
                              }

                              if(data["default_cart_upsell"][1] != undefined){
                                  var cart_upsell_no = 2;
                                  var secondproduct = producthtml(data["default_cart_upsell"][1]["handle"],upsell_display_product_count,cart_upsell_no,data["default_cart_upsell"][1]["v_id"],data["default_cart_upsell"][1]["sellup_id"],data["default_cart_upsell"][1]["id"])
                                  upsellproducts += secondproduct;
                              }
                              if(data["default_cart_upsell"][2] != undefined){
                                  var cart_upsell_no = 3;
                                  var thirdproduct =producthtml(data["default_cart_upsell"][2]["handle"],upsell_display_product_count,cart_upsell_no,data["default_cart_upsell"][2]["v_id"],data["default_cart_upsell"][2]["sellup_id"],data["default_cart_upsell"][2]["id"]) 
                                  upsellproducts += thirdproduct;
                              }
                              var upsellheadinghtml = ''
                              var upsellheading = data["settings"]["cart_title"]
                              if(upsellheading != '' && upsellheading != null){
                                  upsellheadinghtml = '<div id="kartify_upsell_heading"><h3 class="kartify_upsell_heading_h3" style="font-size:1.5em; padding-bottom:10px;">'+upsellheading+'</h3></div>';
                              }else{
                                  upsellheading = 'You may like this:'
                                upsellheadinghtml = '<div id="kartify_upsell_heading"><h3 class="kartify_upsell_heading_h3" style="font-size:1.5em; padding-bottom:10px;">'+upsellheading+'</h3></div>';
                              }
                              var finalupsellhtml = '<div id="launchtip_cart_drawer_upsell_product_wrapper" class="totalcount' + upsell_display_product_count + '" style="display: grid; gap: 10px; grid-auto-flow: column; grid-auto-columns: 340px; margin-left:auto; margin-right:auto; grid-template-columns: repeat(auto-fill, 340px);">' + upsellproducts + '</div>';
                              var upsell_display_product_count_dot = upsell_display_product_count; // Your product count
                              var divstockCount_product = (upsellproducts.match(/<div id="product-/g) || []).length;
                              if (divstockCount_product > 0 && divstockCount_product !== upsell_display_product_count_dot) {
                                upsell_display_product_count_dot = divstockCount_product;
                              }
                              if(upsell_display_product_count_dot != 1){
                                var dotsHtml = '<div class="launchtip_dots" style="display: flex; justify-content: center; gap: 6px; margin-top: 12px; margin-bottom: 12px; margin-left:auto; margin-right:auto;">';
                                for(var i = 0; i < upsell_display_product_count_dot; i++) {
                                  var dotStyle = 'width: 8px; height: 8px; border-radius: 50%; background: #ddd; cursor: pointer; transition: all 0.3s;';
                                  var activeStyle = i === 0 ? 'background: #007bff; transform: scale(1.2);' : '';
                                  dotsHtml += '<div class="launchtip_dot' + (i === 0 ? ' active' : '') + '" data-slide="' + i + '" style="' + dotStyle + activeStyle + '">&nbsp;</div>';
                                }
                                dotsHtml += '</div>';
                              }
                              var cart_upsell_scrollable = dotsHtml

                              // Combine everything
                              var cart_upsell_scrollable = dotsHtml
                              if($("#drawer_sellup_wrapper").length && Shopify.theme.theme_store_id != 1839){
                                $("#drawer_sellup_wrapper").html(upsellheadinghtml+finalupsellhtml);
                              }else{
                                    if($parentDiv.length != 0){
                                      if ( $parentDiv.is('form.cart--form') ){
                                        $('<div id="drawer_sellup_wrapper" style="'+cartstyle+'">'+upsellheadinghtml+finalupsellhtml+'</div>').appendTo($parentDiv);
                                      }else if(Shopify.theme.theme_store_id == 1651){
                                        $('<div id="drawer_sellup_wrapper" style="'+cartstyle+'">'+upsellheadinghtml+finalupsellhtml+'</div>').insertBefore('.cart__details');
                                      }else if(Shopify.theme.theme_store_id == 714){
                                        $('<div id="drawer_sellup_wrapper" style="'+cartstyle+'">'+upsellheadinghtml+finalupsellhtml+'</div>').insertBefore('.mini-cart__drawer-footer');
                                      }else if(Shopify.theme.theme_store_id == 1621){
                                        $('<div id="drawer_sellup_wrapper" style="'+cartstyle+'">'+upsellheadinghtml+finalupsellhtml+'</div>').appendTo('.quick-cart__items');
                                      }else{
                                          $('<div id="drawer_sellup_wrapper" style="'+cartstyle+'">'+upsellheadinghtml+finalupsellhtml+'</div>').insertBefore($parentDiv);
                                      }
                                    }
                              }
                            
                              //cart_drawer_carosal();
                              if(upsell_display_product_count_dot == 1){
                                 $('#launchtip_cart_drawer_upsell_product_wrapper').css({ 'margin-bottom': '9px' });
                                }
                              cartupsells_viewcount();
                              if($('.launchtip_dots').length == 0){
                              $(cart_upsell_scrollable).insertAfter("#drawer_sellup_wrapper");
                              }
                              cart_drawer_carosal();
                              cartupsells_viewcount();
                                //$(cart_upsell_scrollable).insertAfter("#kartify_upsell_wrapper");
                              
                                //cart_drawer_carosal();
                            }

                            var carosal_cont_first_interval = "true";
                            let launchtip_autoPlay = true;
                              function cart_drawer_carosal() {
                                let current = 0;
                                let launchtip_autoPlay = true;
                                let INTERVAL = 100; 
                                let firstSlidePassed = false;

                                const items = document.querySelectorAll('.launchtip_cart_upsell_product_in_drawer');
                                const dots = document.querySelectorAll('.launchtip_dot');
                                const wrappers = document.querySelectorAll('.launchtip_cart_upsell_product_in_drawer');

                                  function stopAutoPlay() {
                                    if (main_cartdrawerInterval) {
                                        clearInterval(main_cartdrawerInterval);
                                        main_cartdrawerInterval = null;
                                    }
                                  }

                                  function startAutoPlay() {
                                    stopAutoPlay();
                                    main_cartdrawerInterval = setInterval(() => {
                                        if (launchtip_autoPlay && carosal_add_to_cart === "false") {
                                            nextSlide();
                                        }
                                    }, INTERVAL);
                                  }

                                  function show(i) {
                                    items.forEach((item, index) => {
                                        if (index === i) {
                                            item.style.setProperty('display', 'inline-block', 'important');
                                            item.style.setProperty('display', 'flex', 'important');
                                        } else {
                                            item.style.setProperty('display', 'none', 'important');
                                        }
                                    });
                                    dots.forEach((dot, index) => {
                                        dot.classList.toggle('active', index === i);
                                        dot.style.setProperty('background-color', index === i ? '#007bff' : '#ddd');
                                    });
                                    carosal_add_to_cart = "false";
                                    current = i;
                                  }

                                  function nextSlide() {
                                    show((current + 1) % items.length);
                                    if (!firstSlidePassed) {  
                                        INTERVAL = 300000;
                                        firstSlidePassed = true;
                                        startAutoPlay(); 
                                    }
                                  }

                                  function prevSlide() {
                                    show((current - 1 + items.length) % items.length);
                                    if (!firstSlidePassed) {  
                                        INTERVAL = 3000000;
                                        firstSlidePassed = true;
                                        startAutoPlay(); 
                                    }
                                  }

                                  dots.forEach((dot, i) => {
                                    dot.onclick = () => {
                                        stopAutoPlay();
                                        show(i);
                                        launchtip_autoPlay = false;
                                        setTimeout(() => {
                                            launchtip_autoPlay = true;
                                            startAutoPlay();
                                        }, 1000);
                                    };
                                  });

                                  if(wrappers){
                                  wrappers.forEach(wrapper => {
                                    let startX = 0;
                                    let endX = 0;
                                    let isMoving = false;

                                    function isAddToCartButton(target) {
                                      return target.closest('.launchtip_upsell_design');
                                    }
                                    function isproducttitle(target) {   
                                      return target.closest('.launchtip_cart_drawer_product_title a');
                                    }
                                    function isimage(target) {
                                      return target.closest('.launchtip_cart_upsell_product_in_drawer .image ');
                                    }
                                    wrapper.addEventListener('touchstart', (e) => {
                                      if (isAddToCartButton(e.target)) return; 
                                      if( isproducttitle(e.target)) return;
                                      if( isimage(e.target)) return;
                                      startX = e.touches[0].clientX;
                                      isMoving = true;
                                    });

                                    wrapper.addEventListener('touchmove', (e) => {
                                      if (!isMoving) return;
                                      endX = e.touches[0].clientX;
                                    });

                                    wrapper.addEventListener('touchend', () => {
                                      if (!isMoving) return;
                                      isMoving = false;

                                      const diff = startX - endX;

                                      if (Math.abs(diff) > 50) {
                                        if (diff > 0) {
                                          nextSlide(); 
                                        } else {
                                          prevSlide(); 
                                        }
                                      } else {
                                        nextSlide(); 
                                      }
                                    });
                                  });
                                  }

                              
                                show(0); 
                                startAutoPlay();
                              }
                                                      
                              

                            
                            if (data["success"] == true) {
                              if (data["cart_upsells_found_or_not"] == false) {
                                if (data["upcart_heading"]["default_cart_use"] == 'auto') {
                                  // console.log('auto');
                                  fetch(window.Shopify.routes.root + "recommendations/products.json?product_id="+items_ids[0]+"&limit=3")
                                    .then(response => response.json())
                                    .then(({ products }) => {
                                      if (products.length > 0) {
                                        // const firstRecommendedProduct = products[0];
                                        data["default_cart_upsell"] = products;
                                        main_success();
                                        //cart_drawer_carosal();
                                      }
                                    }
                                  );
                                }else{
                                  // console.log('custom');
                                  main_success();
                                  //cart_drawer_carosal();
                                  
                                }
                              }else{
                                // console.log('cart_upsells_found');
                                main_success();
                              //cart_drawer_carosal();
                              }
                            }

                            
                          }
                        });
                      }
                    }
                  });
                  var configuration = ({
                    afterOpen: function(event){
                     $(document).find('.featherlight').find('.launchtip_select_option_list').trigger('click');
                    },
                    beforeOpen: function(event){
                      var variant_popup_bg_color = (setting['popup_bg_color'] == '' || setting['popup_bg_color'] == null) ? '#fff' : setting['popup_bg_color'];
                      $('.launchtip_upsell_lightbox h3').attr("style", "color: "+setting['popup_font_color']+";");
                      $('.featherlight-close').attr("style", "background-color: transparent !important; color: "+setting['popup_button_color']+";");
                      $('.launchtip_upsell_lightbox select, .launchtip_upsell_lightbox input').attr("style", "background-color: "+setting['popup_bg_color']+" !important; color: "+setting['popup_font_color']+";");
                      $('.featherlight-content').attr("style", "background-color: "+variant_popup_bg_color+" !important; border-color: "+setting['popup_border_color']+" !important; color: "+setting['popup_font_color']+";");
                      $('.launchtip_upsell_lightbox select.launchtip_select_wrapper').hide();
                      //code here
                      $('.featherlight').addClass('sellup-cart');
                    }
                  });

                  function handleOpenBox(e) {
                    if(Shopify.theme.theme_store_id == 2481){  // horizon theme
                      document.querySelector('.cart-drawer__dialog')?.close();
                    }
                    carosal_add_to_cart = "true";
                    e.preventDefault();
                    var this_id = $(this).attr('href');
                    if( template_name != 'product'){
                      $.featherlight.close(); 
                      $.featherlight(this_id, configuration);
                    }
                  }

                  document.addEventListener('click', function(e) {
                    if (e.target.closest('.openbox')) {
                      handleOpenBox.call(e.target.closest('.openbox'), e);
                    }
                  }, true);

                  $(document).on("click",".featherlight-close",function(e, str) {
                    if(Shopify.theme.theme_store_id == 2481 && str != "switchoffer"){
                      document.querySelector('.cart-drawer__dialog')?.showModal();
                    }
                    carosal_add_to_cart = "false";
                    
                  });

                  function get_selectect_variant_lightbox(variant_id,form){
                    var prod = JSON.parse($(form).find('.provariantdata').text())
                    var pro_variants = prod['variants']
                    var selected_variant = $.grep(pro_variants, function (element, index) {return element.id == variant_id; })[0];
                    if(selected_variant["featured_image"] != null){
                        var selected_variant_img = selected_variant["featured_image"]["src"] || selected_variant["featured_image"]["url"];
                    }
                    else{
                        var selected_variant_img = prod["featured_image"];
                    }
                    $(form).closest('.launchtip_upsell_lightbox').find('.lightboximage').attr("src",selected_variant_img);
                    var selected_variant_firstvariantprice = selected_variant["price"];
                    var selected_variant_firstvariantcprice = selected_variant["compare_at_price"];
                    var cp_html = '';
                    if((selected_variant_firstvariantcprice) && (selected_variant_firstvariantcprice != '') && (selected_variant_firstvariantcprice > selected_variant_firstvariantprice)){
                    
                    }else{
                    cp_html = '';
                    }

                    var final_price_v = Shopify.formatMoneySellUp(selected_variant_firstvariantprice);
                    var main_price = (Math.round(selected_variant_firstvariantprice) / 100).toFixed(2);
                    if(Shopify.currency['active'] == 'JPY' || Shopify.currency['active'] == 'LBP'){
                        var selected_variant_firstvariantprice = final_price_v.substring(0, final_price_v.length - 3);
                    }else{
                        var selected_variant_firstvariantprice = final_price_v;
                    }
                  
                    $(form).find('.popuppricediv').html(selected_variant_firstvariantprice+'</span><input type="hidden" value="'+main_price+'" class="main_price"></div>');
                    if (selected_variant.available == false) {
                        $(form).find('button').find('span').text("Sold Out")
                        $(form).find('button').attr("disabled", true);
                    }
                    else{
                        var pbtntext = $(form).find('button').find('span').attr('data-text')
                        $(form).find('button').find('span').text(pbtntext)
                        $(form).find('button').attr("disabled", false); 
                    }

                  }

                  $(document).on("change click",".launchtip_select_option_list",function(e) {
                    change_popup_selection($(this).closest('div.LaunchTipAddToCartForm'));
                  });

                  function change_popup_selection(form){
                    $(form).find('.popupmsg').text('');
                    var getselectedvaluetext = ''
                    $(form).find('.launchtip_select_option_list').each(function(index) {
                        if(index == 0){
                            getselectedvaluetext += $(this).find("option:selected").text()
                        }
                        else{
                            getselectedvaluetext += ' / '+$(this).find("option:selected").text()
                        }
                    });
                    var valid = false
                    $(form).find(".launchtip_select_wrapper").find('option').each(function(){
                        if ($(this).text() == getselectedvaluetext){
                            // $(this).attr("selected","selected");
                            $(this).prop("selected",true);
                            get_selectect_variant_lightbox(this.value,form)
                            $(form).find('.popupmsg').text(''); 
                            valid = true
                            
                        }else{
                            $(this).prop("selected",false);
                        }

                    });
                    if (valid==false) {
                        $(form).find('button').find('span').text('Unavailable')
                        $(form).find('button').attr("disabled", true);
                    }
                  }


                  function handleAddToCartClick(e){

                    carosal_add_to_cart = "true";
                    e.preventDefault(); 
                  
                    var thiselement = $(this);
                    var originalStyle = thiselement.attr('style');
                    thiselement.prop('disabled', true);
                    $(thiselement).find('span').text("Adding");
                    if (thiselement.hasClass('launchtip_cartdrawer_add_to_cart')) {
                    thiselement.prop('disabled', true);
                    }else{
                      thiselement.css({"background-color": "grey", "cursor": "not-allowed"});
                      thiselement.prop('disabled', true);
                    }
                    var individual_product_id = $(this).attr('ind_product_id');
                    var m_price = $(this).closest('.LaunchTipAddToCartForm').find('.main_price').val();
                    var token1 = generateToken();
                    var sellup_id = $(this).attr('sell-id');
                    var formData = $(this).closest('.LaunchTipAddToCartForm').find(':input').serialize();
                    var params = {
                      type: 'POST',
                      url: '/cart/add.js',
                      data: formData,
                      dataType: 'json',
                      success: function(line_item) { 
                        thiselement.prop('disabled', false);
                        thiselement.attr('style', originalStyle);
                        if ((typeof callback) === 'function') {
                        }
                        else {
                          var all = $.featherlight.opened();
                          // -------------added here-----------
                          // var btn = $(this).closest('form').find('button.launchtip_add_to_cart')

                          var sub_url = 'https://analytics-sellup.herokuapp.com';
                          $.post( sub_url+'/upsell_views',{ shop: shop_name,individual_product_id: individual_product_id, sellup_id: sellup_id, visit_token: token1, event_type: "$click",main_price: m_price, visitor_token: token1, time: Math.round(+new Date()/1000) }).always(function() {
                          
                          });
                          // $.post( sub_url+'/upsell_views',{ shop: shop_name,individual_product_id: individual_product_id, sellup_id: sellup_id, visit_token: token1, event_type: "$click",main_price: m_price, visitor_token: token1,product_id: product_id, time: Math.round(+new Date()/1000) }).always(function() {
                          
                          // });
                          // ----------------end---------------
                        }
                        $(thiselement).find('span').text("Added");
                            setTimeout(function() {
                              $(".featherlight-close").trigger('click');
                            }, 1000);
                            const quantitySelectors = [
                              'form.cart__contents input.quantity__input',
                              'form.cart-table input.quantity__input',
                              'input[name="updates[]"]',
                              'input.cart__qty-input',
                              'input.quantity-input',
                              'input[name^="updates["]' 
                            ];

                        let quantityInput = null;
                        for (const selector of quantitySelectors) {
                          const el = document.querySelector(selector);
                          if (el) {
                            quantityInput = el;
                            break;
                          }
                        }

                        if (quantityInput) {
                          if(Shopify.theme.theme_store_id != 1535){ 
                            if(quantityInput.value > 1 && Shopify.theme.theme_store_id != 1190 && Shopify.theme.theme_store_id != 857){
                              quantityInput.value = 1;
                            }
                            const changeEvent = new Event("change", { bubbles: true });
                            quantityInput.dispatchEvent(changeEvent);
                              if(Shopify.theme.theme_store_id == 1651 || Shopify.theme.theme_store_id == 2481){ // local theme
                               quantityInput.dispatchEvent(new Event("input", { bubbles: true }));
                              }
                          }else{
                            function reloadCartDiv() {
                              fetch('/cart/change.js')
                                .then(response => response.json())
                                .then(data => {
                                  console.log("call");
                                  fetch(`${window.location.pathname}?sections=cart-drawer,cart-items`)
                                    .then(response => response.json())
                                    .then(sections => {
                                      if (sections['cart-items']) {
                                        const cartDiv = document.querySelector('[data-cart-items]');
                                        if (cartDiv) {
                                          cartDiv.innerHTML = sections['cart-items'];
                                        }
                                      }
                                    });
                                });
                            }
                            reloadCartDiv(); 
                          }
                        
                        } else {
                          console.warn("No quantity input found on this theme.");
                          //window.location.reload();
                        }
                        if (Shopify.theme.theme_store_id === 2481 || Shopify.theme.theme_store_id === 3626 || Shopify.theme.theme_store_id === 3621){
                          
                          window.location.reload();

                          //document.dispatchEvent(new CustomEvent('cart:open'));
                          //document.querySelector('.header-actions__action')?.click();
                        
                        //document.querySelector('form.cart__contents input.quantity__input').dispatchEvent(new Event("change", { bubbles: true }));
                        }else{
                        // window.location.reload();
                        }

                      },
                      error: function(XMLHttpRequest, textStatus) {
                        erroroncart(XMLHttpRequest, textStatus);
                      }
                    };
                    
                    setTimeout(function() { $.ajax(params); }, 1000);
                  }

                  if (!window.addToCartListenerAttached) {
                    document.addEventListener('click', function(e) {
                      if (e.target.closest('.LaunchTipAddToCartForm .launchtip_cartdrawer_add_to_cart,form#AddToCartForm button#AddToCart')) {
                        handleAddToCartClick.call(e.target.closest('.LaunchTipAddToCartForm .launchtip_cartdrawer_add_to_cart,form#AddToCartForm button#AddToCart'), e);
                      }
                    }, true);
                    window.addToCartListenerAttached = true;
                  }


              } else {
                console.log('No checkout-related button found.');
              }
            }else{
            console.log('No parent <div> with class "cart--drawer" found.');
            }
          })(jQuery);
        }

        function cart_detect_change(){
          const originalFetch = window.fetch;
          window.fetch = function (request, options) {
          return originalFetch.call(window, request, options)
            .then(response => {
              const responseClone = response.clone()
              if (responseClone.url.indexOf("/cart/change") > -1 ||
                responseClone.url.indexOf("/cart/add") > -1 ||
                responseClone.url.indexOf("/cart/update") > -1 ||
                responseClone.url.indexOf("api.monkcommerce.app/app/offer") > -1) {
                responseClone.json().then(data => {
                  setTimeout(function() {
                    cartdrawer_value();
                  }, 0);
                });
              }
              if (responseClone.url.indexOf("/products?section_id") > -1) {
                
              }
              return response;
            })
            .catch(error => {
              throw error;
            });
          };
        }

        function hype_cart_detect($){
          // jQuery(window).on('load', function () {
          if ($('script[src*="hypecart"]').length) {
            // setTimeout(function() {
              $('div.LaunchTipAddToCartForm').each(function(index) {
                var form = $(this);
                var addbutton = $(this).find('button');
                if (addbutton.attr('name') == 'add') {
                  $(addbutton).attr('name', 'add1');
                }
                if (addbutton.hasClass('add-to-cart')) {
                  $(addbutton).removeClass('add-to-cart').addClass('add-to-cart1');
                }
              });
            // }, 1000);
          }
          // });
        }

        function generateToken() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          });
        }

        function cart_drawer_title_event(){
          $(document).on('mouseenter', '.launchtip_cart_drawer_product_title a', function() {
          $(this).css('text-decoration', 'underline');
          });

          $(document).on('mouseleave', '.launchtip_cart_drawer_product_title a', function() {
              $(this).css('text-decoration', 'none');
          });
        }

  if(template_name == "product" || thank_you_page == true || order_preview_page == true){
      
    var allcurrenceis = {"USD":{"symbol":"$","name":"US Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"USD","name_plural":"US dollars"},"CAD":{"symbol":"CA$","name":"Canadian Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"CAD","name_plural":"Canadian dollars"},"EUR":{"symbol":"€","name":"Euro","symbol_native":"€","decimal_digits":2,"rounding":0,"code":"EUR","name_plural":"euros"},"AED":{"symbol":"AED","name":"United Arab Emirates Dirham","symbol_native":"د.إ.‏","decimal_digits":2,"rounding":0,"code":"AED","name_plural":"UAE dirhams"},"AFN":{"symbol":"Af","name":"Afghan Afghani","symbol_native":"؋","decimal_digits":0,"rounding":0,"code":"AFN","name_plural":"Afghan Afghanis"},"ALL":{"symbol":"ALL","name":"Albanian Lek","symbol_native":"Lek","decimal_digits":0,"rounding":0,"code":"ALL","name_plural":"Albanian lekë"},"AMD":{"symbol":"AMD","name":"Armenian Dram","symbol_native":"դր.","decimal_digits":0,"rounding":0,"code":"AMD","name_plural":"Armenian drams"},"ARS":{"symbol":"AR$","name":"Argentine Peso","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"ARS","name_plural":"Argentine pesos"},"AUD":{"symbol":"AU$","name":"Australian Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"AUD","name_plural":"Australian dollars"},"AZN":{"symbol":"man.","name":"Azerbaijani Manat","symbol_native":"ман.","decimal_digits":2,"rounding":0,"code":"AZN","name_plural":"Azerbaijani manats"},"BAM":{"symbol":"KM","name":"Bosnia-Herzegovina Convertible Mark","symbol_native":"KM","decimal_digits":2,"rounding":0,"code":"BAM","name_plural":"Bosnia-Herzegovina convertible marks"},"BDT":{"symbol":"Tk","name":"Bangladeshi Taka","symbol_native":"৳","decimal_digits":2,"rounding":0,"code":"BDT","name_plural":"Bangladeshi takas"},"BGN":{"symbol":"BGN","name":"Bulgarian Lev","symbol_native":"лв.","decimal_digits":2,"rounding":0,"code":"BGN","name_plural":"Bulgarian leva"},"BHD":{"symbol":"BD","name":"Bahraini Dinar","symbol_native":"د.ب.‏","decimal_digits":3,"rounding":0,"code":"BHD","name_plural":"Bahraini dinars"},"BIF":{"symbol":"FBu","name":"Burundian Franc","symbol_native":"FBu","decimal_digits":0,"rounding":0,"code":"BIF","name_plural":"Burundian francs"},"BND":{"symbol":"BN$","name":"Brunei Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"BND","name_plural":"Brunei dollars"},"BOB":{"symbol":"Bs","name":"Bolivian Boliviano","symbol_native":"Bs","decimal_digits":2,"rounding":0,"code":"BOB","name_plural":"Bolivian bolivianos"},"BRL":{"symbol":"R$","name":"Brazilian Real","symbol_native":"R$","decimal_digits":2,"rounding":0,"code":"BRL","name_plural":"Brazilian reals"},"BWP":{"symbol":"BWP","name":"Botswanan Pula","symbol_native":"P","decimal_digits":2,"rounding":0,"code":"BWP","name_plural":"Botswanan pulas"},"BYR":{"symbol":"BYR","name":"Belarusian Ruble","symbol_native":"BYR","decimal_digits":0,"rounding":0,"code":"BYR","name_plural":"Belarusian rubles"},"BZD":{"symbol":"BZ$","name":"Belize Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"BZD","name_plural":"Belize dollars"},"CDF":{"symbol":"CDF","name":"Congolese Franc","symbol_native":"FrCD","decimal_digits":2,"rounding":0,"code":"CDF","name_plural":"Congolese francs"},"CHF":{"symbol":"CHF","name":"Swiss Franc","symbol_native":"CHF","decimal_digits":2,"rounding":0.05,"code":"CHF","name_plural":"Swiss francs"},"CLP":{"symbol":"CL$","name":"Chilean Peso","symbol_native":"$","decimal_digits":0,"rounding":0,"code":"CLP","name_plural":"Chilean pesos"},"CNY":{"symbol":"CN¥","name":"Chinese Yuan","symbol_native":"CN¥","decimal_digits":2,"rounding":0,"code":"CNY","name_plural":"Chinese yuan"},"COP":{"symbol":"CO$","name":"Colombian Peso","symbol_native":"$","decimal_digits":0,"rounding":0,"code":"COP","name_plural":"Colombian pesos"},"CRC":{"symbol":"₡","name":"Costa Rican Colón","symbol_native":"₡","decimal_digits":0,"rounding":0,"code":"CRC","name_plural":"Costa Rican colóns"},"CVE":{"symbol":"CV$","name":"Cape Verdean Escudo","symbol_native":"CV$","decimal_digits":2,"rounding":0,"code":"CVE","name_plural":"Cape Verdean escudos"},"CZK":{"symbol":"Kč","name":"Czech Republic Koruna","symbol_native":"Kč","decimal_digits":2,"rounding":0,"code":"CZK","name_plural":"Czech Republic korunas"},"DJF":{"symbol":"Fdj","name":"Djiboutian Franc","symbol_native":"Fdj","decimal_digits":0,"rounding":0,"code":"DJF","name_plural":"Djiboutian francs"},"DKK":{"symbol":"Dkr","name":"Danish Krone","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"DKK","name_plural":"Danish kroner"},"DOP":{"symbol":"RD$","name":"Dominican Peso","symbol_native":"RD$","decimal_digits":2,"rounding":0,"code":"DOP","name_plural":"Dominican pesos"},"DZD":{"symbol":"DA","name":"Algerian Dinar","symbol_native":"د.ج.‏","decimal_digits":2,"rounding":0,"code":"DZD","name_plural":"Algerian dinars"},"EEK":{"symbol":"Ekr","name":"Estonian Kroon","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"EEK","name_plural":"Estonian kroons"},"EGP":{"symbol":"EGP","name":"Egyptian Pound","symbol_native":"ج.م.‏","decimal_digits":2,"rounding":0,"code":"EGP","name_plural":"Egyptian pounds"},"ERN":{"symbol":"Nfk","name":"Eritrean Nakfa","symbol_native":"Nfk","decimal_digits":2,"rounding":0,"code":"ERN","name_plural":"Eritrean nakfas"},"ETB":{"symbol":"Br","name":"Ethiopian Birr","symbol_native":"Br","decimal_digits":2,"rounding":0,"code":"ETB","name_plural":"Ethiopian birrs"},"GBP":{"symbol":"£","name":"British Pound Sterling","symbol_native":"£","decimal_digits":2,"rounding":0,"code":"GBP","name_plural":"British pounds sterling"},"GEL":{"symbol":"GEL","name":"Georgian Lari","symbol_native":"GEL","decimal_digits":2,"rounding":0,"code":"GEL","name_plural":"Georgian laris"},"GHS":{"symbol":"GH₵","name":"Ghanaian Cedi","symbol_native":"GH₵","decimal_digits":2,"rounding":0,"code":"GHS","name_plural":"Ghanaian cedis"},"GNF":{"symbol":"FG","name":"Guinean Franc","symbol_native":"FG","decimal_digits":0,"rounding":0,"code":"GNF","name_plural":"Guinean francs"},"GTQ":{"symbol":"GTQ","name":"Guatemalan Quetzal","symbol_native":"Q","decimal_digits":2,"rounding":0,"code":"GTQ","name_plural":"Guatemalan quetzals"},"HKD":{"symbol":"HK$","name":"Hong Kong Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"HKD","name_plural":"Hong Kong dollars"},"HNL":{"symbol":"HNL","name":"Honduran Lempira","symbol_native":"L","decimal_digits":2,"rounding":0,"code":"HNL","name_plural":"Honduran lempiras"},"HRK":{"symbol":"kn","name":"Croatian Kuna","symbol_native":"kn","decimal_digits":2,"rounding":0,"code":"HRK","name_plural":"Croatian kunas"},"HUF":{"symbol":"Ft","name":"Hungarian Forint","symbol_native":"Ft","decimal_digits":0,"rounding":0,"code":"HUF","name_plural":"Hungarian forints"},"IDR":{"symbol":"Rp","name":"Indonesian Rupiah","symbol_native":"Rp","decimal_digits":0,"rounding":0,"code":"IDR","name_plural":"Indonesian rupiahs"},"ILS":{"symbol":"₪","name":"Israeli New Sheqel","symbol_native":"₪","decimal_digits":2,"rounding":0,"code":"ILS","name_plural":"Israeli new sheqels"},"INR":{"symbol":"Rs","name":"Indian Rupee","symbol_native":"₹","decimal_digits":2,"rounding":0,"code":"INR","name_plural":"Indian rupees"},"IQD":{"symbol":"IQD","name":"Iraqi Dinar","symbol_native":"د.ع.‏","decimal_digits":0,"rounding":0,"code":"IQD","name_plural":"Iraqi dinars"},"IRR":{"symbol":"IRR","name":"Iranian Rial","symbol_native":"﷼","decimal_digits":0,"rounding":0,"code":"IRR","name_plural":"Iranian rials"},"ISK":{"symbol":"Ikr","name":"Icelandic Króna","symbol_native":"kr","decimal_digits":0,"rounding":0,"code":"ISK","name_plural":"Icelandic krónur"},"JMD":{"symbol":"J$","name":"Jamaican Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"JMD","name_plural":"Jamaican dollars"},"JOD":{"symbol":"JD","name":"Jordanian Dinar","symbol_native":"د.أ.‏","decimal_digits":3,"rounding":0,"code":"JOD","name_plural":"Jordanian dinars"},"JPY":{"symbol":"¥","name":"Japanese Yen","symbol_native":"￥","decimal_digits":0,"rounding":0,"code":"JPY","name_plural":"Japanese yen"},"KES":{"symbol":"Ksh","name":"Kenyan Shilling","symbol_native":"Ksh","decimal_digits":2,"rounding":0,"code":"KES","name_plural":"Kenyan shillings"},"KHR":{"symbol":"KHR","name":"Cambodian Riel","symbol_native":"៛","decimal_digits":2,"rounding":0,"code":"KHR","name_plural":"Cambodian riels"},"KMF":{"symbol":"CF","name":"Comorian Franc","symbol_native":"FC","decimal_digits":0,"rounding":0,"code":"KMF","name_plural":"Comorian francs"},"KRW":{"symbol":"₩","name":"South Korean Won","symbol_native":"₩","decimal_digits":0,"rounding":0,"code":"KRW","name_plural":"South Korean won"},"KWD":{"symbol":"KD","name":"Kuwaiti Dinar","symbol_native":"د.ك.‏","decimal_digits":3,"rounding":0,"code":"KWD","name_plural":"Kuwaiti dinars"},"KZT":{"symbol":"KZT","name":"Kazakhstani Tenge","symbol_native":"тңг.","decimal_digits":2,"rounding":0,"code":"KZT","name_plural":"Kazakhstani tenges"},"LBP":{"symbol":"LB£","name":"Lebanese Pound","symbol_native":"LBP ","decimal_digits":0,"rounding":0,"code":"LBP","name_plural":"Lebanese pounds"},"LKR":{"symbol":"SLRs","name":"Sri Lankan Rupee","symbol_native":"SL Re","decimal_digits":2,"rounding":0,"code":"LKR","name_plural":"Sri Lankan rupees"},"LTL":{"symbol":"Lt","name":"Lithuanian Litas","symbol_native":"Lt","decimal_digits":2,"rounding":0,"code":"LTL","name_plural":"Lithuanian litai"},"LVL":{"symbol":"Ls","name":"Latvian Lats","symbol_native":"Ls","decimal_digits":2,"rounding":0,"code":"LVL","name_plural":"Latvian lati"},"LYD":{"symbol":"LD","name":"Libyan Dinar","symbol_native":"د.ل.‏","decimal_digits":3,"rounding":0,"code":"LYD","name_plural":"Libyan dinars"},"MAD":{"symbol":"MAD","name":"Moroccan Dirham","symbol_native":"د.م.‏","decimal_digits":2,"rounding":0,"code":"MAD","name_plural":"Moroccan dirhams"},"MDL":{"symbol":"MDL","name":"Moldovan Leu","symbol_native":"MDL","decimal_digits":2,"rounding":0,"code":"MDL","name_plural":"Moldovan lei"},"MGA":{"symbol":"MGA","name":"Malagasy Ariary","symbol_native":"MGA","decimal_digits":0,"rounding":0,"code":"MGA","name_plural":"Malagasy Ariaries"},"MKD":{"symbol":"MKD","name":"Macedonian Denar","symbol_native":"MKD","decimal_digits":2,"rounding":0,"code":"MKD","name_plural":"Macedonian denari"},"MMK":{"symbol":"MMK","name":"Myanma Kyat","symbol_native":"K","decimal_digits":0,"rounding":0,"code":"MMK","name_plural":"Myanma kyats"},"MOP":{"symbol":"MOP$","name":"Macanese Pataca","symbol_native":"MOP$","decimal_digits":2,"rounding":0,"code":"MOP","name_plural":"Macanese patacas"},"MUR":{"symbol":"MURs","name":"Mauritian Rupee","symbol_native":"MURs","decimal_digits":0,"rounding":0,"code":"MUR","name_plural":"Mauritian rupees"},"MXN":{"symbol":"MX$","name":"Mexican Peso","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"MXN","name_plural":"Mexican pesos"},"MYR":{"symbol":"RM","name":"Malaysian Ringgit","symbol_native":"RM","decimal_digits":2,"rounding":0,"code":"MYR","name_plural":"Malaysian ringgits"},"MZN":{"symbol":"MTn","name":"Mozambican Metical","symbol_native":"MTn","decimal_digits":2,"rounding":0,"code":"MZN","name_plural":"Mozambican meticals"},"NAD":{"symbol":"N$","name":"Namibian Dollar","symbol_native":"N$","decimal_digits":2,"rounding":0,"code":"NAD","name_plural":"Namibian dollars"},"NGN":{"symbol":"₦","name":"Nigerian Naira","symbol_native":"₦","decimal_digits":2,"rounding":0,"code":"NGN","name_plural":"Nigerian nairas"},"NIO":{"symbol":"C$","name":"Nicaraguan Córdoba","symbol_native":"C$","decimal_digits":2,"rounding":0,"code":"NIO","name_plural":"Nicaraguan córdobas"},"NOK":{"symbol":"Nkr","name":"Norwegian Krone","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"NOK","name_plural":"Norwegian kroner"},"NPR":{"symbol":"NPRs","name":"Nepalese Rupee","symbol_native":"नेरू","decimal_digits":2,"rounding":0,"code":"NPR","name_plural":"Nepalese rupees"},"NZD":{"symbol":"NZ$","name":"New Zealand Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"NZD","name_plural":"New Zealand dollars"},"OMR":{"symbol":"OMR","name":"Omani Rial","symbol_native":"ر.ع.‏","decimal_digits":3,"rounding":0,"code":"OMR","name_plural":"Omani rials"},"PAB":{"symbol":"B/.","name":"Panamanian Balboa","symbol_native":"B/.","decimal_digits":2,"rounding":0,"code":"PAB","name_plural":"Panamanian balboas"},"PEN":{"symbol":"S/.","name":"Peruvian Nuevo Sol","symbol_native":"S/.","decimal_digits":2,"rounding":0,"code":"PEN","name_plural":"Peruvian nuevos soles"},"PHP":{"symbol":"₱","name":"Philippine Peso","symbol_native":"₱","decimal_digits":2,"rounding":0,"code":"PHP","name_plural":"Philippine pesos"},"PKR":{"symbol":"PKRs","name":"Pakistani Rupee","symbol_native":"₨","decimal_digits":0,"rounding":0,"code":"PKR","name_plural":"Pakistani rupees"},"PLN":{"symbol":"zł","name":"Polish Zloty","symbol_native":"zł","decimal_digits":2,"rounding":0,"code":"PLN","name_plural":"Polish zlotys"},"PYG":{"symbol":"₲","name":"Paraguayan Guarani","symbol_native":"₲","decimal_digits":0,"rounding":0,"code":"PYG","name_plural":"Paraguayan guaranis"},"QAR":{"symbol":"QR","name":"Qatari Rial","symbol_native":"ر.ق.‏","decimal_digits":2,"rounding":0,"code":"QAR","name_plural":"Qatari rials"},"RON":{"symbol":"RON","name":"Romanian Leu","symbol_native":"RON","decimal_digits":2,"rounding":0,"code":"RON","name_plural":"Romanian lei"},"RSD":{"symbol":"din.","name":"Serbian Dinar","symbol_native":"дин.","decimal_digits":0,"rounding":0,"code":"RSD","name_plural":"Serbian dinars"},"RUB":{"symbol":"RUB","name":"Russian Ruble","symbol_native":"руб.","decimal_digits":2,"rounding":0,"code":"RUB","name_plural":"Russian rubles"},"RWF":{"symbol":"RWF","name":"Rwandan Franc","symbol_native":"FR","decimal_digits":0,"rounding":0,"code":"RWF","name_plural":"Rwandan francs"},"SAR":{"symbol":"SR","name":"Saudi Riyal","symbol_native":"ر.س.‏","decimal_digits":2,"rounding":0,"code":"SAR","name_plural":"Saudi riyals"},"SDG":{"symbol":"SDG","name":"Sudanese Pound","symbol_native":"SDG","decimal_digits":2,"rounding":0,"code":"SDG","name_plural":"Sudanese pounds"},"SEK":{"symbol":"Skr","name":"Swedish Krona","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"SEK","name_plural":"Swedish kronor"},"SGD":{"symbol":"S$","name":"Singapore Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"SGD","name_plural":"Singapore dollars"},"SOS":{"symbol":"Ssh","name":"Somali Shilling","symbol_native":"Ssh","decimal_digits":0,"rounding":0,"code":"SOS","name_plural":"Somali shillings"},"SYP":{"symbol":"SY£","name":"Syrian Pound","symbol_native":"ل.س.‏","decimal_digits":0,"rounding":0,"code":"SYP","name_plural":"Syrian pounds"},"THB":{"symbol":"฿","name":"Thai Baht","symbol_native":"฿","decimal_digits":2,"rounding":0,"code":"THB","name_plural":"Thai baht"},"TND":{"symbol":"DT","name":"Tunisian Dinar","symbol_native":"د.ت.‏","decimal_digits":3,"rounding":0,"code":"TND","name_plural":"Tunisian dinars"},"TOP":{"symbol":"T$","name":"Tongan Paʻanga","symbol_native":"T$","decimal_digits":2,"rounding":0,"code":"TOP","name_plural":"Tongan paʻanga"},"TRY":{"symbol":"TL","name":"Turkish Lira","symbol_native":"TL","decimal_digits":2,"rounding":0,"code":"TRY","name_plural":"Turkish Lira"},"TTD":{"symbol":"TT$","name":"Trinidad and Tobago Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"TTD","name_plural":"Trinidad and Tobago dollars"},"TWD":{"symbol":"NT$","name":"New Taiwan Dollar","symbol_native":"NT$","decimal_digits":2,"rounding":0,"code":"TWD","name_plural":"New Taiwan dollars"},"TZS":{"symbol":"TSh","name":"Tanzanian Shilling","symbol_native":"TSh","decimal_digits":0,"rounding":0,"code":"TZS","name_plural":"Tanzanian shillings"},"UAH":{"symbol":"₴","name":"Ukrainian Hryvnia","symbol_native":"₴","decimal_digits":2,"rounding":0,"code":"UAH","name_plural":"Ukrainian hryvnias"},"UGX":{"symbol":"USh","name":"Ugandan Shilling","symbol_native":"USh","decimal_digits":0,"rounding":0,"code":"UGX","name_plural":"Ugandan shillings"},"UYU":{"symbol":"$U","name":"Uruguayan Peso","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"UYU","name_plural":"Uruguayan pesos"},"UZS":{"symbol":"UZS","name":"Uzbekistan Som","symbol_native":"UZS","decimal_digits":0,"rounding":0,"code":"UZS","name_plural":"Uzbekistan som"},"VEF":{"symbol":"Bs.F.","name":"Venezuelan Bolívar","symbol_native":"Bs.F.","decimal_digits":2,"rounding":0,"code":"VEF","name_plural":"Venezuelan bolívars"},"VND":{"symbol":"₫","name":"Vietnamese Dong","symbol_native":"₫","decimal_digits":0,"rounding":0,"code":"VND","name_plural":"Vietnamese dong"},"XAF":{"symbol":"FCFA","name":"CFA Franc BEAC","symbol_native":"FCFA","decimal_digits":0,"rounding":0,"code":"XAF","name_plural":"CFA francs BEAC"},"XOF":{"symbol":"CFA","name":"CFA Franc BCEAO","symbol_native":"CFA","decimal_digits":0,"rounding":0,"code":"XOF","name_plural":"CFA francs BCEAO"},"YER":{"symbol":"YR","name":"Yemeni Rial","symbol_native":"ر.ي.‏","decimal_digits":0,"rounding":0,"code":"YER","name_plural":"Yemeni rials"},"ZAR":{"symbol":"R","name":"South African Rand","symbol_native":"R","decimal_digits":2,"rounding":0,"code":"ZAR","name_plural":"South African rand"},"ZMK":{"symbol":"ZK","name":"Zambian Kwacha","symbol_native":"ZK","decimal_digits":0,"rounding":0,"code":"ZMK","name_plural":"Zambian kwachas"}}
    var Shopify = Shopify || {};

    // ---------------------------------------------------------------------------
    // Money format handler
    // ---------------------------------------------------------------------------
    // alert(allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"]);
    if((typeof allcurrenceis[window.ShopifyAnalytics.meta.currency] != 'undefined') && (typeof allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"] != 'undefined') && window.ShopifyAnalytics.meta.currency != 'GEL' && window.ShopifyAnalytics.meta.currency != 'GEL'){
      if(window.ShopifyAnalytics.meta.currency == 'HUF'){
        Shopify.money_format_sellup = "{{amount_no_decimals_with_comma_separator}} "+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"];
      }else if(window.ShopifyAnalytics.meta.currency == 'EUR' && window.Shopify.shop == "babyphone-8trades.myshopify.com"){
        Shopify.money_format_sellup = "{{amount_with_comma_separator}} "+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"];
      }else if(window.ShopifyAnalytics.meta.currency == 'AED' && window.Shopify.shop == "opto-watch-co.myshopify.com"){
        Shopify.money_format_sellup = "Dhs. {{amount}}";
      }else if(window.ShopifyAnalytics.meta.currency == 'DKK' && (window.Shopify.shop == "goodiebox-popup.myshopify.com" || window.Shopify.shop == "commedeuxshop.myshopify.com" || window.Shopify.shop == "petlux.myshopify.com")){
        Shopify.money_format_sellup = "{{amount_with_comma_separator}} "+window.ShopifyAnalytics.meta.currency;
      }else if(window.ShopifyAnalytics.meta.currency == 'PLN'){
        Shopify.money_format_sellup = "{{amount_with_comma_separator}} "+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"];
      }else if(window.ShopifyAnalytics.meta.currency == 'TRY'){
        Shopify.money_format_sellup = "{{amount_no_decimals_with_comma_separator}}"+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"];
      }else if(window.ShopifyAnalytics.meta.currency == 'DKK' && window.Shopify.shop == "dktrimmer.myshopify.com"){
        Shopify.money_format_sellup = "{{amount}} "+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"];
      }else if(window.ShopifyAnalytics.meta.currency == 'DKK' &&  window.Shopify.shop == "prelovedelectronics.myshopify.com"){
        Shopify.money_format_sellup = "{{amount_no_trailing_zeros}} "+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"]; 
      }else{
        Shopify.money_format_sellup = allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"]+"{{amount}}";
      }
    }else{
      Shopify.money_format_sellup = "{{amount}} "+window.ShopifyAnalytics.meta.currency;   
    }
  
    Shopify.formatMoneySellUp = function(cents, format) {
      if (typeof cents == 'string') { cents = cents.replace('.',''); }
      var value = '';
      var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      var formatString = (format || this.money_format_sellup);

      function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
      }

      function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal   = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) { return 0; }

        number = (number/100.0).toFixed(precision);

        var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
      }

      switch(formatString.match(placeholderRegex)[1]) {
        case 'amount':
          value = formatWithDelimiters(cents, 2);
          break;
        case 'amount_no_decimals':
          value = formatWithDelimiters(cents, 0);
          break;
        case 'amount_with_comma_separator':
          value = formatWithDelimiters(cents, 2, '.', ',');
          break;
        case 'amount_no_decimals_with_comma_separator':
          value = formatWithDelimiters(cents, 0, '.', ',');
          break;
        case 'amount_no_trailing_zeros':
          value = formatWithDelimiters(cents, 2);
          if (value.endsWith('.00')) {
            value = value.slice(0, -3);
          }
          break;
      }

      return formatString.replace(placeholderRegex, value);
    };

    function convertToSlug(Text){
      return Text
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-')
      ;
    }

    // /////////////////////////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////////////////////////

    jQueryCode = function(){
   
     // duplicate offer products
      const removeDuplicateOfferProds = (data) => {
        let seenOffers = new Set();
        let seenProducts = new Set();
        return data.filter(offer => {
          if (seenOffers.has(offer.id)) {
            return false; // Skip duplicate offers1
          }
          seenOffers.add(offer.id);

          if (!offer.upseller_upsell_product) return true;

          offer.upseller_upsell_product = offer.upseller_upsell_product.map(product => {
            let uniqueKey = `${product.id}-${product.v_id}-${offer.onpage_offer_type}`;
            if (seenProducts.has(uniqueKey)) {
              return { handle: "" };
            }
            seenProducts.add(uniqueKey);
            return product;
          });

          return true;
        });
      };

      !function(a){"use strict";function b(a,c){if(!(this instanceof b)){var d=new b(a,c);return d.open(),d}this.id=b.id++,this.setup(a,c),this.chainCallbacks(b._callbackChain)}function c(a,b){var c={};for(var d in a)d in b&&(c[d]=a[d],delete a[d]);return c}function d(a,b){var c={},d=new RegExp("^"+b+"([A-Z])(.*)");for(var e in a){var f=e.match(d);if(f){var g=(f[1]+f[2].replace(/([A-Z])/g,"-$1")).toLowerCase();c[g]=a[e]}}return c}if("undefined"==typeof a)return void("console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery."));if(a.fn.jquery.match(/-ajax/))return void("console"in window&&window.console.info("Featherlight needs regular jQuery, not the slim version."));var e=[],f=function(b){return e=a.grep(e,function(a){return a!==b&&a.$instance.closest("body").length>0})},g={allow:1,allowfullscreen:1,frameborder:1,height:1,longdesc:1,marginheight:1,marginwidth:1,mozallowfullscreen:1,name:1,referrerpolicy:1,sandbox:1,scrolling:1,src:1,srcdoc:1,style:1,webkitallowfullscreen:1,width:1},h={keyup:"onKeyUp",resize:"onResize"},i=function(c){a.each(b.opened().reverse(),function(){return c.isDefaultPrevented()||!1!==this[h[c.type]](c)?void 0:(c.preventDefault(),c.stopPropagation(),!1)})},j=function(c){if(c!==b._globalHandlerInstalled){b._globalHandlerInstalled=c;var d=a.map(h,function(a,c){return c+"."+b.prototype.namespace}).join(" ");a(window)[c?"on":"off"](d,i)}};b.prototype={constructor:b,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:false,closeOnEsc:false,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:a.noop,beforeContent:a.noop,beforeClose:a.noop,afterOpen:a.noop,afterContent:a.noop,afterClose:a.noop,onKeyUp:a.noop,onResize:a.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(b,c){"object"!=typeof b||b instanceof a!=!1||c||(c=b,b=void 0);var d=a.extend(this,c,{target:b}),e=d.resetCss?d.namespace+"-reset":d.namespace,f=a(d.background||['<div class="'+e+"-loading "+e+'">','<div class="'+e+'-content">','<button class="'+e+"-close-icon "+d.namespace+'-close" aria-label="Close">',d.closeIcon,"</button>",'<div class="'+d.namespace+'-inner">'+d.loading+"</div>","</div>","</div>"].join("")),g="."+d.namespace+"-close"+(d.otherClose?","+d.otherClose:"");return d.$instance=f.clone().addClass(d.variant),d.$instance.on(d.closeTrigger+"."+d.namespace,function(b){if(!b.isDefaultPrevented()){var c=a(b.target);("background"===d.closeOnClick&&c.is("."+d.namespace)||"anywhere"===d.closeOnClick||c.closest(g).length)&&(d.close(b),b.preventDefault())}}),this},getContent:function(){if(this.persist!==!1&&this.$content)return this.$content;var b=this,c=this.constructor.contentFilters,d=function(a){return b.$currentTarget&&b.$currentTarget.attr(a)},e=d(b.targetAttr),f=b.target||e||"",g=c[b.type];if(!g&&f in c&&(g=c[f],f=b.target&&e),f=f||d("href")||"",!g)for(var h in c)b[h]&&(g=c[h],f=b[h]);if(!g){var i=f;if(f=null,a.each(b.contentFilters,function(){return g=c[this],g.test&&(f=g.test(i)),!f&&g.regex&&i.match&&i.match(g.regex)&&(f=i),!f}),!f)return"console"in window&&window.console.error("Featherlight: no content filter found "+(i?' for "'+i+'"':" (no target specified)")),!1}return g.process.call(b,f)},setContent:function(b){return this.$instance.removeClass(this.namespace+"-loading"),this.$instance.toggleClass(this.namespace+"-iframe",b.is("iframe")),this.$instance.find("."+this.namespace+"-inner").not(b).slice(1).remove().end().replaceWith(a.contains(this.$instance[0],b[0])?"":b),this.$content=b.addClass(this.namespace+"-inner"),this},open:function(b){var c=this;if(c.$instance.hide().appendTo(c.root),!(b&&b.isDefaultPrevented()||c.beforeOpen(b)===!1)){b&&b.preventDefault();var d=c.getContent();if(d)return e.push(c),j(!0),c.$instance.fadeIn(c.openSpeed),c.beforeContent(b),a.when(d).always(function(a){c.setContent(a),c.afterContent(b)}).then(c.$instance.promise()).done(function(){c.afterOpen(b)})}return c.$instance.detach(),a.Deferred().reject().promise()},close:function(b){var c=this,d=a.Deferred();return c.beforeClose(b)===!1?d.reject():(0===f(c).length&&j(!1),c.$instance.fadeOut(c.closeSpeed,function(){c.$instance.detach(),c.afterClose(b),d.resolve()})),d.promise()},resize:function(a,b){if(a&&b){this.$content.css("width","").css("height","");var c=Math.max(a/(this.$content.parent().width()-1),b/(this.$content.parent().height()-1));c>1&&(c=b/Math.floor(b/c),this.$content.css("width",""+a/c+"px").css("height",""+b/c+"px"))}},chainCallbacks:function(b){for(var c in b)this[c]=a.proxy(b[c],this,a.proxy(this[c],this))}},a.extend(b,{id:0,autoBind:"[data-featherlight]",defaults:b.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(b){return b instanceof a&&b},process:function(b){return this.persist!==!1?a(b):a(b).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff?|bmp|svg)(\?\S*)?$/i,process:function(b){var c=this,d=a.Deferred(),e=new Image,f=a('<img src="'+b+'" alt="" class="'+c.namespace+'-image" />');return e.onload=function(){f.naturalWidth=e.width,f.naturalHeight=e.height,d.resolve(f)},e.onerror=function(){d.reject(f)},e.src=b,d.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(b){return a(b)}},ajax:{regex:/./,process:function(b){var c=a.Deferred(),d=a("<div></div>").load(b,function(a,b){"error"!==b&&c.resolve(d.contents()),c.fail()});return c.promise()}},iframe:{process:function(b){var e=new a.Deferred,f=a("<iframe/>"),h=d(this,"iframe"),i=c(h,g);return f.hide().attr("src",b).attr(i).css(h).on("load",function(){e.resolve(f.show())}).appendTo(this.$instance.find("."+this.namespace+"-content")),e.promise()}},text:{process:function(b){return a("<div>",{text:b})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(b,c){var d=this,e=new RegExp("^data-"+c+"-(.*)"),f={};return b&&b.attributes&&a.each(b.attributes,function(){var b=this.name.match(e);if(b){var c=this.value,g=a.camelCase(b[1]);if(a.inArray(g,d.functionAttributes)>=0)c=new Function(c);else try{c=JSON.parse(c)}catch(h){}f[g]=c}}),f},extend:function(b,c){var d=function(){this.constructor=b};return d.prototype=this.prototype,b.prototype=new d,b.__super__=this.prototype,a.extend(b,this,c),b.defaults=b.prototype,b},attach:function(b,c,d){var e=this;"object"!=typeof c||c instanceof a!=!1||d||(d=c,c=void 0),d=a.extend({},d);var f,g=d.namespace||e.defaults.namespace,h=a.extend({},e.defaults,e.readElementConfig(b[0],g),d),i=function(g){var i=a(g.currentTarget),j=a.extend({$source:b,$currentTarget:i},e.readElementConfig(b[0],h.namespace),e.readElementConfig(g.currentTarget,h.namespace),d),k=f||i.data("featherlight-persisted")||new e(c,j);"shared"===k.persist?f=k:k.persist!==!1&&i.data("featherlight-persisted",k),j.$currentTarget.blur&&j.$currentTarget.blur(),k.open(g)};return b.on(h.openTrigger+"."+h.namespace,h.filter,i),{filter:h.filter,handler:i}},current:function(){var a=this.opened();return a[a.length-1]||null},opened:function(){var b=this;return f(),a.grep(e,function(a){return a instanceof b})},close:function(a){var b=this.current();return b?b.close(a):void 0},_onReady:function(){var b=this;if(b.autoBind){var c=a(b.autoBind);c.each(function(){b.attach(a(this))}),a(document).on("click",b.autoBind,function(d){if(!d.isDefaultPrevented()){var e=a(d.currentTarget),f=c.length;if(c=c.add(e),f!==c.length){var g=b.attach(e);(!g.filter||a(d.target).parentsUntil(e,g.filter).length>0)&&g.handler(d)}}})}},_callbackChain:{onKeyUp:function(b,c){return 27===c.keyCode?(this.closeOnEsc&&a.featherlight.close(c),!1):b(c)},beforeOpen:function(b,c){return a(document.documentElement).addClass("with-featherlight"),this._previouslyActive=document.activeElement,this._$previouslyTabbable=a("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")),this._$previouslyWithTabIndex=a("[tabindex]").not('[tabindex="-1"]'),this._previousWithTabIndices=this._$previouslyWithTabIndex.map(function(b,c){return a(c).attr("tabindex")}),this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex",-1),document.activeElement.blur&&document.activeElement.blur(),b(c)},afterClose:function(c,d){var e=c(d),f=this;return this._$previouslyTabbable.removeAttr("tabindex"),this._$previouslyWithTabIndex.each(function(b,c){a(c).attr("tabindex",f._previousWithTabIndices[b])}),this._previouslyActive.focus(),0===b.opened().length&&a(document.documentElement).removeClass("with-featherlight"),e},onResize:function(a,b){return this.resize(this.$content.naturalWidth,this.$content.naturalHeight),a(b)},afterContent:function(a,b){var c=a(b);return this.$instance.find("[autofocus]:not([disabled])").focus(),this.onResize(b),c}}}),a.featherlight=b,a.fn.featherlight=function(a,c){return b.attach(this,a,c),this},a(document).ready(function(){b._onReady()})}(jQuery);

      jQuery(document).ready(function($) {

        function addGoogleFont(FontName) {
          $("head").append("<link href='https://fonts.googleapis.com/css?family=" + FontName + "' rel='stylesheet' type='text/css'>");
        }
        var thank_you_page = page_url.includes("thank_you");
        var order_preview_page = page_url.includes("orders");
        if(thank_you_page == true || order_preview_page == true){
          var template = __st.pageurl;
          if(thank_you_page == true || order_preview_page == true){
            var timer2 = "10:01";
            var interval = setInterval(function() {
              var timer = timer2.split(':');
              //by parsing integer, I avoid all extra string processing
              var minutes = parseInt(timer[0], 10);
              var seconds = parseInt(timer[1], 10);
              --seconds;
              minutes = (seconds < 0) ? --minutes : minutes;
              if (minutes < 0) clearInterval(interval);
              seconds = (seconds < 0) ? 59 : seconds;
              seconds = (seconds < 10) ? '0' + seconds : seconds;
              $('.upsell_countdown').html(minutes + ':' + seconds);
              timer2 = minutes + ':' + seconds;
            }, 1000);
          }
        }

        var str = __st.pageurl
        var rest = str.substring(0, str.lastIndexOf("/") + 1);
        var template1 = str.substring(str.lastIndexOf("/") + 1, str.length);
        var template = __st.p
        var shop_name = Shopify.shop;
        var base_url = 'https://sellup.herokuapp.com';   


        if (thank_you_page == true || order_preview_page == true) {
          var url = base_url + '/output/post_upsell.json?shop=' + shop_name;

          $.ajax({
            crossOrigin: true,
            url: url,
            success: function(data) {
              if (data["upsell_data"]["upseller_status"] == true) {
                var final_price_v = Shopify.formatMoneySellUp(data['first_var_price']);
                var comppricestyletoapply = '';
                var pricestylestoapply = '';
                var pricestyletoapply = '';
                var setting = data['setting'];

                if (setting.up_price_font_size != '' && setting.up_price_font_size != null) {
                  pricestylestoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                }
                if (setting.up_price_font_color != '' && setting.up_price_font_color != null) {
                  pricestyletoapply += 'color:' + setting.up_price_font_color + ';';
                }
                if (setting.up_comp_price_font_color != '' && setting.up_comp_price_font_color != null) {
                  comppricestyletoapply += 'color:' + setting.up_comp_price_font_color + ';';
                }
                if (data['compare_var_price'] != null) {
                  var compare_price_v = Shopify.formatMoneySellUp(data['compare_var_price']);
                  var compare_price_data = '<span style="text-decoration: line-through;' + comppricestyletoapply + '">' + compare_price_v + '</span><br>'
                }

                if (data["upsell_data"]["upseller_status"] == true) {
                  if (data["upsell_data"]["post_upsell_title"].includes("{{ countdown }}") == true) {

                    var post_upsell_title = data["upsell_data"]["post_upsell_title"].replace('{{ countdown }}', '');

                    var countdown_span = '<span class="upsell_countdown"></span>';
                  } else {
                    var post_upsell_title = data["upsell_data"]["post_upsell_title"];
                    var countdown_span = '';
                  }

                  if (data["upsell_data"]["upseller_lead_product_mode"] == "product") {

                    var title = data["upsell_data"]["upseller_lead_prod_title"]
                    var image = data["upsell_data"]["upseller_lead_prod_img_url"]
                    var handle = "/products/" + data["upsell_data"]["upseller_lead_prod_handle"]

                  } else if (data["upsell_data"]["upseller_lead_product_mode"] == "collection") {
                    var title = data["upsell_data"]["upseller_lead_collect_title"]
                    var image = data["upsell_data"]["upseller_lead_collect_img"]
                    var handle = "/collections/" + data["upsell_data"]["upseller_lead_collect_handle"]
                    var final_price_v = "";
                  }

                  var btnstyletoapply = '';
                  if (setting.up_button_font_size != '') {
                    btnstyletoapply += 'font-size:' + setting.up_button_font_size + 'px;'
                  }
                  if (setting.up_button_bg_color != '') {
                    btnstyletoapply += 'background-color:' + setting.up_button_bg_color + ';';
                  }
                  if (setting.up_button_font_color != '') {
                    btnstyletoapply += 'color:' + setting.up_button_font_color + ';';
                  }
                  if (image != '') {
                    var image_data = '<div class="" style="width: 20%;display: table-cell;vertical-align: middle;"><div class="image upline"><a href="' + handle + '"><img style="width: 70px;height: auto;border-radius: 8px;" src="' + image + '" alt="'+title.replace(/"/g, '').replace(/'/g, '')+'"></a></div></div>';
                  } else {
                    var image_data = "";
                  }

                  Shopify.Checkout.OrderStatus.addContentBox('<h1 style="color: #000000;">' + post_upsell_title + countdown_span + '</h2><p style="color: #000000; font-size: 20px; padding-top: 2%;">' + data["upsell_data"]["post_upsell_description"] + '</p><div class="row" style="width: 100%; display: table;padding-left: 1%;padding-top: 2%;">' + image_data + '<div style="width: 55%;display: table-cell;vertical-align: middle;"><div class="details upline" style=""><a class="detail_title" href="' + handle + '"><span class="title" style="font-weight: bold;" title="' + title + '">' + title + '</span></a></div></div><div style="width: 25%;display: table-cell;vertical-align: middle;"><div class="detail_price" style="text-align: center;' + pricestylestoapply + '">' + (compare_price_data != undefined ? compare_price_data : '') + '<span style="' + pricestyletoapply + '">' + final_price_v + '</span></span></div></div></div><div style="padding-top: 2%;"><a class="btn" href="' + handle + '" style="width: 100%;float: right;font-size:16px; font-weight: bold;' + btnstyletoapply + '">' + data["upsell_data"]["post_upsell_link_text"] + '</a></div>')
                } else {

                }
              } else {
                return false;
              }
            }
          })
        }

        const product_id = __st.rid;
        shop_name = Shopify.shop
        var url = base_url+'/output/sellup_shop_data.json?shop='+shop_name+'&id='+product_id;
        var setting, upsellers, upsellers_action, sorted_upsellers_action;
        var upsell_data, upsell_action_data = [];
        var lead_product_data_plan;
        var lead_product_data_plan_count;

        $.ajax({
          crossOrigin: true,
          url: url,
          success: function(data) {

            const theme_id = Shopify.theme.theme_store_id;
            setting = data['setting'];
            compact_mode_offers_data["compact_mode"] = setting["compact_mode"]
            compact_mode_offers_data["offers_expend_text"] = setting["offers_expend_text"] == '' ? 'View More' : setting["offers_expend_text"]
            compact_mode_offers_data["offers_shrink_text"] = setting["offers_shrink_text"] == '' ? 'View Less' : setting["offers_shrink_text"]
           if (data['lead_pro_data']) {
              lead_product_data_plan = data['lead_pro_data']['requiresSellingPlan'];
              lead_product_data_plan_count = data['lead_pro_data']['sellingPlanGroups']['edges'] ? data['lead_pro_data']['sellingPlanGroups']['edges'].length : 0;
            }else{
              lead_product_data_plan = false;
              lead_product_data_plan_count = 0;
            }
            upsellers = data['upsellers'];
            var upsell_automatic_sell_up_id = upsellers
            .filter(upseller => upseller.upseller_name === "AI Automatic Onpage Upsell")
            upsellers_action = data['upsellers_action'];
            var current_upsell_length = upsellers.length;
 
            sorted_upsellers_action = data['sorted_upsellers_action'];

            const product_id1 = __st.rid
            var upsell_data =  upsellers.filter(u =>
              u.upseller_lead_products.some(ulp => ulp.id == product_id1)
            );

            var upsell_variant_product_data = upsellers.filter(u =>
              u.upseller_lead_products.some(ulp => ulp.id == product_id1) && u.variant_product_mode == true
            );

            // upsell_data = removeDuplicateOfferProds(upsell_data);
 
            var upsell_action_data  = upsellers_action.filter(u =>
              u.upseller_lead_products.some(ulp => ulp.id == product_id1)
            );
            // upsell_data = data['upsell_data'];
            // upsell_action_data = data['upsell_action_data'];

            if (template == "product") {
              var product_id = __st.rid
              mainproductob = data['lead_pro_data'];
              mainproduct_title = mainproductob.title;
              $('head').append('<link type="text/css" href="'+base_url+'/upseller/upseller.css?'+Math.random()+'" rel="stylesheet">');

              var btnstyletoapply = '';
              if (setting.up_button_bg_color != '' && setting.up_button_bg_color != null) {
                btnstyletoapply += 'background-color:' + setting.up_button_bg_color + ';';
              }else{
                btnstyletoapply += 'background-color:#000;';
              }
              if (setting.up_button_font_color != '' && setting.up_button_font_color != null) {
                btnstyletoapply += 'color:' + setting.up_button_font_color + ';';
              }
              $('head').append('<style type="text/css">#launchtip_upsell_select_wrapper input[type=checkbox]:checked + label:before{'+btnstyletoapply+'}</style>');

              // if(setting.up_style == "custom"){
                $('head').append('<style type="text/css">'+setting.up_custom_css+'</style>');
              // }
              if(setting.clip_product_title){
                $('head').append('<style type="text/css">\
                  div.productbox div.details a.detail_title span.title{\
                    display: -webkit-box;\
                    -webkit-line-clamp: 1;\
                    -webkit-box-orient: vertical;\
                    overflow: hidden;\
                    text-overflow: ellipsis;\
                    margin: 0;\
                  }\
                  #launchtip_upsell_select_wrapper .check_details p.title{\
                    text-overflow: ellipsis;\
                    white-space: nowrap;\
                    overflow: hidden;\
                  }\
                  </style>\
                ');
              }

              var url = base_url+'/output/view?shop='+ shop_name+'&product_id='+product_id+'&upsell_type=onpage';
              const cacheKey = "sellUpProductViewData_" + product_id;
              const cacheDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
              const upsell_length_match = "upsell_length_match";

              // funtion data of cache onpage data
              function fetchDataWithCache(url, cacheKey, cacheDuration) {
                const now = new Date().getTime();
                const cacheExpiryKey = `${cacheKey}_expiry`;
                // Check for cached data in localStorage and validate expiry

                const cachedData = localStorage.getItem(cacheKey);
                const cacheExpiry = localStorage.getItem(cacheExpiryKey);
                previous_upsell_length_match = localStorage.getItem('upsell_length_match');
                previous_upsell_length_match = parseInt(previous_upsell_length_match, 10);
                if (previous_upsell_length_match == current_upsell_length) {
                  var cached_upsell_length = 1
                } else {
                  var cached_upsell_length = 0
                }

                if (cachedData && cacheExpiry && now < cacheExpiry && cached_upsell_length == 1) {
                  // Return cached data if not expired
                  return Promise.resolve(JSON.parse(cachedData));
                }

                // Make the AJAX request if cache doesn't exist or is expired
                return new Promise((resolve, reject) => {
                  $.ajax({
                    crossOrigin: true,
                    url: url,
                    dataType: "json",
                    success: function(data) {
                      // Cache the data in localStorage with expiry time
                      localStorage.setItem(cacheKey, JSON.stringify(data));
                      localStorage.setItem(cacheExpiryKey, now + cacheDuration);
                      localStorage.setItem(upsell_length_match, current_upsell_length)
                      resolve(data);
                    },
                    error: function(xhr, status, error) {
                      console.error("Error fetching data:", error);
                      reject(error);
                    }
                  });
                });
              }

              fetchDataWithCache(url, cacheKey, cacheDuration, current_upsell_length).then(data => {
                // Use the data here to render in Shopify theme
                var is_offer_redirected = getQueryAddress("upsell_id");
                if (is_offer_redirected != null && is_offer_redirected != '') {
                  $('form[action*="/cart/add"]').prepend('<input class="upseller_redirected_offer" type="hidden" name="properties[_sellup_id]" value="' + is_offer_redirected + '">');
                }

                var is_par_att_con_present = getQueryAddress("par_att_con");
                if (is_par_att_con_present != null && is_par_att_con_present != '') {
                  $('form[action*="/cart/add"]').prepend('<input class="parent_attribution_input" type="hidden" name="properties[added]" value="' + getQueryAddress("par_att_con") + '">');
                }

                var sellup_id = data["sellup_id"];
                if (upsellers.length > 0) {
                  var status = data["success"]
                  if (status == true) {
                    // console.log('271 test')
                    // console.log(data)
                    var myArray = data["collections"];

                    // coll_data = jQuery.grep(upsellers, function(n, i) { x
                    //   return myArray.indexOf(n.upseller_lead_collect_id) > -1;
                    // });

                    coll_data = [];

                    upsellers.forEach(item => {
                      item.upseller_lead_collections.forEach(collection => {
                        if (myArray.includes(collection.id)) {
                          remove_trigger_product = item.upseller_upsell_product.filter(product => product.id != product_id);
                          item.upseller_upsell_product = remove_trigger_product;
                          coll_data.push(item);
                        }
                      });
                    });

                    if (coll_data.length > 0) {
                      $.each(coll_data, function(index, val) {
                        upsell_data.push(val)
                      });
                    }
                  }
                  upsell_data =  upsell_data.filter(u => u.variant_product_mode == false );
                  upsell_data = removeDuplicateOfferProds(upsell_data);
                  if (upsell_data.length > 0 || upsell_variant_product_data.length > 0) {
                    get_product(upsell_data, sellup_id)
                    initializeSubscriptionSelections();

                  } else {
                    if (setting.automatic_onpage_offer_status){ 
                      const defaultUpsellersArray = upsell_automatic_sell_up_id
                      var extractedProducts
                      fetch(window.Shopify.routes.root + "recommendations/products.json?product_id=" + product_id + "&limit=8")
                        .then(response => response.json())
                        .then(({ products }) => {
                          if (products && products.length > 0) {
                            // const firstRecommendedProduct = products[0];
                            extractedProducts = products.map(product => ({
                              id: product.id,
                              title: product.title,
                              handle: product.handle,
                              v_id: "",
                              featured_img: product.featured_image || product.images[0] || ""
                            }));
                            

                            const randomIndices = [];
                            const randomProducts = [];
                              
                              // Get 3 unique random indices
                              while (randomIndices.length < 3 && randomIndices.length < extractedProducts.length) {
                                const randomIndex = Math.floor(Math.random() * extractedProducts.length);
                                if (!randomIndices.includes(randomIndex)) {
                                  randomIndices.push(randomIndex);
                                  randomProducts.push(extractedProducts[randomIndex]);
                                }
                              }
                            

                            defaultUpsellersArray[0].upseller_upsell_product = randomProducts;
                            sellup_id = defaultUpsellersArray[0].id;
                            get_product(defaultUpsellersArray, sellup_id)
                             initializeSubscriptionSelections();
                          }
                        })
                        .catch(error => {
                          console.error('Error fetching product recommendations:', error);
                        });
                    }
                  }
                  // varint mode functionality
                    if (upsell_variant_product_data.length > 0) {
                      (function () {
                        let lastVariantId = null;

                        function getVariantIdFromURL() {
                          const urlParams = new URLSearchParams(window.location.search);
                          if (!urlParams.has('variant')) {
                            return window.meta.product.variants[0].id;
                          }else{
                          return urlParams.get('variant');
                          }
                        }

                        function triggerOnChange(newId, callback) {
                          if (newId && newId !== lastVariantId) {
                            lastVariantId = newId;
                            callback(newId);upsell_variant_product_data 
                          }
                        }

                        function onVariantChange(callback) {
                          // Initial trigger
                          triggerOnChange(getVariantIdFromURL(), callback);

                          // 1. Polling fallback (in case of JS-only URL changes)
                          //setInterval(() => {
                          //  const variantId = getVariantIdFromURL();
                          // triggerOnChange(variantId, callback);
                          //}, 300);

                          // 2. Listen to popstate (browser back/forward)
                          window.addEventListener('popstate', () => {
                            const variantId = getVariantIdFromURL();
                            triggerOnChange(variantId, callback);
                          });

                          // 3. Patch pushState and replaceState
                          const pushState = history.pushState;
                          history.pushState = function () {
                            pushState.apply(this, arguments);
                            const variantId = getVariantIdFromURL();
                            triggerOnChange(variantId, callback);
                          };

                          const replaceState = history.replaceState;
                          history.replaceState = function () {
                            replaceState.apply(this, arguments);
                            const variantId = getVariantIdFromURL();
                            triggerOnChange(variantId, callback);
                          };
                        }

                        // 📌 Usage
                        onVariantChange((variantId) => {
                          $('.launchtip_varint_product_data_offer').remove();
                          if (upsell_variant_product_data.length > 0) {
                              var variant_product_data = upsell_variant_product_data.filter(u => {
                                const matchingKeys = Object.keys(u.upseller_upsell_product_variant).filter(key => 
                                    u.upseller_upsell_product_variant[key].trigger_v_id == variantId
                                );
                                
                                if (matchingKeys.length > 0) {
                                    // Empty the array and replace with ALL matched data
                                    u.upseller_upsell_product = matchingKeys.map(key => {
                                        const matchedVariant = u.upseller_upsell_product_variant[key];
                                        return {
                                            "id": matchedVariant.id,
                                            "title": matchedVariant.offer_v_id_title || "Default Title",
                                            "handle": matchedVariant.offer_handle_id || "default-handle",
                                            "v_id": matchedVariant.offer_v_id,
                                            "featured_img": matchedVariant.featured_img
                                        };
                                    });
                                    
                                    return true;
                                }
                                
                                return false;
                              });
                            var variant_class_data = "launchtip_varint_product_data_offer";
                              if (variant_product_data.length > 0) {
                                variant_product_data = removeDuplicateOfferProds(variant_product_data);
                                if(window.Shopify.shop == "evakvp-ub.myshopify.com"){
                                  setTimeout(function(){
                                    get_product(variant_product_data, sellup_id, variant_class_data);
                                    initializeSubscriptionSelections();
                                   }, 1000);
                                 
                                }else{
                                 get_product(variant_product_data, sellup_id, variant_class_data);
                                 initializeSubscriptionSelections();
                                }
                              
                              }
                          } else {

                          }
                        });
                      })();
                    }
                  // end variant mode functionlaity

                }else{
                  if (setting.automatic_onpage_offer_status){
                    const defaultUpsellersArray = upsell_automatic_sell_up_id
                    var extractedProducts
                    fetch(window.Shopify.routes.root + "recommendations/products.json?product_id=8036128620702&limit=3")
                      .then(response => response.json())
                      .then(({ products }) => {
                        if (products && products.length > 0) {
                          // const firstRecommendedProduct = products[0];
                          extractedProducts = products.map(product => ({
                            id: product.id,
                            title: product.title,
                            handle: product.handle,
                            v_id: "",
                            featured_img: product.featured_image || product.images[0] || ""
                          }));
                          
                          defaultUpsellersArray[0].upseller_upsell_product = extractedProducts;
                          sellup_id = defaultUpsellersArray[0].id;
                          if (sellup_id != null && sellup_id != '') {
                            get_product(defaultUpsellersArray, sellup_id)
                             initializeSubscriptionSelections();
                          }
                          
                        }
                      })
                    .catch(error => {
                    });
                  } 
                }
                // if(upsellers_action.length > 0){
                //     var status = data["success"]
                //     if (status == true){
                //         var myArray = data["collections"];
                //         coll_data_actopn = jQuery.grep(upsellers_action, function( n, i ) {
                //         return myArray.indexOf(n.upseller_lead_collect_id) > -1;
                //         });
                //         if(coll_data_actopn.length > 0){
                //             $.each(coll_data_actopn , function(index, val) {
                //               upsell_action_data.push(val)
                //             });
                //         }               
                //     }
                //     if(upsell_action_data.length > 0){
                //         get_action_product(upsell_action_data, sellup_id);     
                //     }  
                // }

                // --------started sorted_upsellers_action------------

                if (sorted_upsellers_action.length > 0) {
                  var sorted_upsellers_ids = []
                  sorted_upsellers_action.map(function(n) {
                    if (n.product_id == __st.rid) {
                      sorted_upsellers_ids.push(n.upseller_id)
                    }
                  });
                  // console.log(upsellers_action)
                  var sortedactionoffers = []
                  if (sorted_upsellers_ids.lenght != 0) {
                    // for ( var i = 0; i < sorted_upsellers_ids.length; i++ ) {
                    $.each(sorted_upsellers_ids, function(index, val) {
                      // upsellers_action.map(function( d ) {
                      $.each(upsellers_action, function(index, val1) {
                        if (val1.id == val) {
                          sortedactionoffers.push(val1)
                        }
                      });
                    });
                  }
                  if (sortedactionoffers.length > 0) {
                  upsell_action_data = removeDuplicateOfferProds(sortedactionoffers);
                    get_action_product(upsell_action_data, sellup_id);
                    // console.log('if')
                    // console.log(sortedactionoffers)
                  } else {
                    // console.log('inner else')
                    var status = data["success"]
                    if (status == true) {
                      var myArray = data["collections"];

                      coll_data_actopn = [];

                      upsellers_action.forEach(item => {
                        item.upseller_lead_collections.forEach(collection => {
                          if (myArray.includes(collection.id)) {
                            coll_data_actopn.push(item);
                          }
                        });
                      });

                      // coll_data_actopn = jQuery.grep(upsellers_action, function(n, i) {
                      //   return myArray.indexOf(n.upseller_lead_collect_id) > -1;
                      // });
                      if (coll_data_actopn.length > 0) {
                        $.each(coll_data_actopn, function(index, val) {
                          upsell_action_data.push(val)
                        });
                      }
                    }
                    if (upsell_action_data.length > 0) {
                      upsell_action_data.sort(function(x, y) {
                        return x.id - y.id;
                      });
                      upsell_action_data.sort((a, b) => (a.action_offer_type > b.action_offer_type ? -1 : 1))
                      upsell_action_data = removeDuplicateOfferProds(upsell_action_data);
                      get_action_product(upsell_action_data, sellup_id);
                      // console.log(upsell_action_data)
                    }
                  }
                } else {
                  // console.log('outer else')
                  var status = data["success"]
                  if (status == true) {
                    var myArray = data["collections"];

                    coll_data_actopn = [];

                    upsellers_action.forEach(item => {
                      item.upseller_lead_collections.forEach(collection => {
                        if (myArray.includes(collection.id)) {
                          coll_data_actopn.push(item);
                        }
                      });
                    });

                    // coll_data_actopn = jQuery.grep(upsellers_action, function(n, i) {
                    //   return myArray.indexOf(n.upseller_lead_collect_id) > -1;
                    // });

                    if (coll_data_actopn.length > 0) {
                      $.each(coll_data_actopn, function(index, val) {
                        upsell_action_data.push(val)
                      });
                    }
                  }
                  if (upsell_action_data.length > 0) {
                    upsell_action_data.sort(function(x, y) {
                      return x.id - y.id;
                    });
                    upsell_action_data.sort((a, b) => (a.action_offer_type > b.action_offer_type ? -1 : 1))
                    upsell_action_data = removeDuplicateOfferProds(upsell_action_data);
                    get_action_product(upsell_action_data, sellup_id);
                    // console.log(upsell_action_data)
                  }
                }

                // ---------end----------
                var token1 = generateToken();
                if (sellup_id.length != 0) {
                  $.each(sellup_id, function(index, value) {

                    var sub_url = 'https://analytics-sellup.herokuapp.com';

                    var url_ind_pr = base_url + '/output/individual_detail.json?sellup_id=' + value;
                    $.ajax({
                      url: url_ind_pr,
                      success: function(data) {
                        //var ind_upsell_data = JSON.stringify(data["ind_upsell_data"]);

                        // var url_full = sub_url+'/upsell_views.json?shop='+shop_name+'&visit_token='+token1+'&event_type=$view&sellup_id='+value+'&ind_upsell_data='+data["ind_upsell_data"];

                        // $.ajax({
                        //       crossOrigin: true,
                        //       url: url_full,
                        //     success: function(data) {

                        //     }
                        //     });

                        //for(var i = 1; i < 470; i++) {
                        $.post(sub_url + '/upsell_views', {
                          shop: shop_name,
                          visit_token: token1,
                          visitor_token: token1,
                          event_type: "$view",
                          sellup_id: value,
                          ind_upsell_data: data["ind_upsell_data"],
                          time: Math.round(+new Date() / 1000)
                        }).always(function() {});
                        //}

                      }
                    })
                    //$.post( base_url+'/ahoy/events',{ shop: shop_name, visit_token: token1,visitor_token: token1,event_type: "$view", sellup_id: value,time: Math.round(+new Date()/1000) }).always(function() {

                    //});
                  });

                }else {
                    var sub_url = 'https://analytics-sellup.herokuapp.com';
                    if (setting.automatic_onpage_offer_status) {
                      var value = upsell_automatic_sell_up_id[0].id
                      $.post(sub_url + '/upsell_views', {
                        shop: shop_name,
                        visit_token: token1,
                        visitor_token: token1,
                        event_type: "$view",
                        sellup_id: value,
                        ind_upsell_data: "Automatic Onpage Upsell",
                        time: Math.round(+new Date() / 1000)
                      }).always(function() {});
                    }
                }

                setTimeout(function() {
                  hype_cart_detect($);
                }, 1000);
              });

              //////////////////////////////////////////////////////////////////////////
              if ($('.appstle_sub_widget input[name="selling_plan"]').length) {
                $(document).on('change', '.appstle_sub_widget input[name="selling_plan"]', function() {
                    handleAppstleSelection($(this));
                });
              }
              
              if ($('.shopify_subscriptions_app_block').length) {
                // Now safe to bind
                $(document).on('change', '.shopify_subscriptions_app_block input[type="radio"]', function () {
                    handleSelection($(this));
                });
              }
              function getQueryAddress(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
              }

              function fullerrormessage(errors) {
                var fullMessages = [];
                $.each(errors, function(attribute, messages) {
                  $.each(messages, function(index, message) {
                    fullMessages.push(attribute + ' ' + message);
                  });
                });
                return fullMessages
              }

              function erroroncart(XMLHttpRequest, textStatus) {
                var data = eval('(' + XMLHttpRequest.responseText + ')');
                if (!!data.message) {
                  alert(data.message + '(' + data.status  + '): ' + data.description);
                } else {
                  alert('Error : ' + fullerrormessage(data).join('; ') + '.');
                }
              }
              function generateToken() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                  return v.toString(16);
                });
              }

              function get_selectect_variant_lightbox(variant_id, form, type) {
                var prod = JSON.parse($(form).find('.provariantdata').text())
                var pro_variants = prod['variants']
                var selected_variant = $.grep(pro_variants, function(element, index) {
                  return element.id == variant_id;
                })[0];
                if (selected_variant["featured_image"] != null) {
                  var selected_variant_img = selected_variant["featured_image"]["src"];
                } else {
                  var selected_variant_img = prod["featured_image"];
                }

                var selected_variant_firstvariantprice = selected_variant["price"];
                var selected_variant_firstvariantcprice = selected_variant["compare_at_price"];
                var cp_html = '';
                if ((selected_variant_firstvariantcprice) && (selected_variant_firstvariantcprice != '') && (selected_variant_firstvariantcprice > selected_variant_firstvariantprice)) {
                  var comp_text = '';

                  if (setting.up_comp_price_text != '') {
                    comp_text = setting.up_comp_price_text;
                  }

                  var final_price_v = Shopify.formatMoneySellUp(selected_variant_firstvariantcprice);

                  if (Shopify.currency['active'] == 'JPY' || Shopify.currency['active'] == 'LBP') {
                    var selected_variant_firstvariantcprice = final_price_v.substring(0, final_price_v.length - 3);
                  } else {
                    var selected_variant_firstvariantcprice = final_price_v;
                  }
                  var pricestyletoapply = '';
                  var comppricestyletoapply = '';
                  if (setting.up_price_font_size != '' && setting.up_price_font_size != null) {
                    pricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                  }
                  if (setting.up_price_font_color != '' && setting.up_price_font_color != null) {
                    pricestyletoapply += 'color:' + setting.up_price_font_color + ';';
                  }
                  if (setting.up_comp_price_font_color != '' && setting.up_comp_price_font_color != null) {
                    comppricestyletoapply += 'color:' + setting.up_comp_price_font_color + ';';
                    comppricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                  }

                  if (type == 'checkbox') {
                    cp_html = '<p class="comparechprice chprice" style="'+comppricestyletoapply+'"><del>' + comp_text + ' ' + selected_variant_firstvariantcprice + '</del></p>'
                  }else{
                    cp_html = '<span class="compareprice launchtip_price" style="text-decoration: line-through;' + comppricestyletoapply + '">' + comp_text + ' ' + selected_variant_firstvariantcprice + '</span>'
                  }
                } else {
                  cp_html = '';
                  //cp_html = '<span class="compareprice price" style=""></span>';
                }
                var price_text = '';
                if (setting.up_price_text != '' && cp_html != '') {
                  price_text = setting.up_price_text;
                }
                var sold_out_text_value = '';
                if (setting.sold_out_text != '') {
                  sold_out_text_value = setting.sold_out_text;
                }

                var final_price_v = Shopify.formatMoneySellUp(selected_variant_firstvariantprice);
                var main_price = (Math.round(selected_variant_firstvariantprice) / 100).toFixed(2);
                //var main_price = selected_variant_firstvariantprice;

                if (Shopify.currency['active'] == 'JPY' || Shopify.currency['active'] == 'LBP') {
                  var selected_variant_firstvariantprice = final_price_v.substring(0, final_price_v.length - 3);
                } else {
                  var selected_variant_firstvariantprice = final_price_v;
                }
                var pricestyletoapply = '';
                if (setting.up_price_font_size != '' && setting.up_price_font_size != null) {
                  pricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                }
                if (setting.up_price_font_color != '' && setting.up_price_font_color != null) {
                  pricestyletoapply += 'color:' + setting.up_price_font_color + ';';
                }

                if (type == 'checkbox') {
                  $(form).find('.check_price').html(cp_html + '<p class="chprice" style="' + pricestyletoapply + '">' + price_text + ' ' + selected_variant_firstvariantprice + '</p><input type="hidden" value="' + main_price + '" class="main_price">');
                  $(form).find('.check_image img').attr("src", selected_variant_img);
                  $(form).find('.check_details p.title a').attr("title", selected_variant.name);
                  $(form).find('.check_details p.title a').text(selected_variant.name);

                  if (selected_variant.available == false) {
                    $(form).find('input:checkbox').prop("disabled", true);
                    $(form).find('input:checkbox').prop("checked", false);
                  } else {
                    $(form).find('input:checkbox').prop("disabled", false);
                  }
                }else{
                  var formbutton = $(form).find('button');
                  $(form).find('.popuppricediv').html('<div class="detail_price">' + cp_html + '<span class="launcthtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + selected_variant_firstvariantprice + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>');
                  $(form).closest('.launchtip_upsell_lightbox').find('.lightboximage').attr("src", selected_variant_img);
                  formbutton.attr("title", selected_variant.name);
                  if (selected_variant.available == false) {
                    formbutton.find('span').text(sold_out_text_value)
                    formbutton.attr("disabled", true);
                  } else {
                    var pbtntext = formbutton.find('span').attr('data-text')
                    formbutton.find('span').text(pbtntext)
                    formbutton.attr("disabled", false);
                  }
                }
              }

              function change_popup_selection(form) {
                $(form).find('.popupmsg').text('');
                var getselectedvaluetext = ''
                $(form).find('.launchtip_select_option_list').each(function(index) {
                  if (index == 0) {
                    getselectedvaluetext += $(this).find("option:selected").text()
                  } else {
                    getselectedvaluetext += ' / ' + $(this).find("option:selected").text()
                  }
                });
                var valid = false
                $(form).find(".launchtip_select_wrapper").find('option').each(function() {
                  if ($(this).text() == getselectedvaluetext) {
                    // $(this).attr("selected","selected");
                    $(this).prop("selected", true);
                    get_selectect_variant_lightbox(this.value, form, 'button')
                    $(form).find('.popupmsg').text('');
                    valid = true
                    // $(form).find('button').find('span').text('Add this')
                    // $(form).find('button').attr("disabled", false);  
                    // return false;
                  } else {
                    $(this).prop("selected", false);
                  }
                  // else{
                  //     $(form).find('button').find('span').text('Unavailable')
                  //     $(form).find('button').attr("disabled", true);
                  // }
                });
                if (valid == false) {
                  $(form).find('button').find('span').text('Unavailable')
                  $(form).find('button').attr("disabled", true);
                }
              }

              $(document).on("change click",".launchtip_select_option_list",function(e) {
                change_popup_selection($(this).closest('form'));
              })

              $(document).on("change",".launchtip_check_select_wrapper",function(e) {
                get_selectect_variant_lightbox(this.value, $(this).parents('.onpage_item'), 'checkbox');
              })

              $(document).on("click", ".LaunchTipAddToCartForm .launchtip_add_to_cart", function(e) {
                e.preventDefault();
                var thiselement = $(this)
                var originalStyle = thiselement.attr('style');
                thiselement.prop('disabled', true);
                thiselement.css({"background-color": "grey", "cursor": "not-allowed"});

                var offer_type = thiselement.attr('action-type');
                var upsell_offer_type = thiselement.attr('upsell-type');
                if (offer_type == "upsell") {
                  // variant_page_url = $(location).attr('href');
                  // var added_lead_variant = variant_page_url.substring(variant_page_url.lastIndexOf("variant="), variant_page_url.length);
                  // if (added_lead_variant.includes("variant=")) {
                  //  parts1 = added_lead_variant.split("variant=");
                  //  selected_variant_id = parts1[parts1.length - 1];
                  //  selected_variant_id = selected_variant_id.replace("#", '');
                  // } else {
                  //  parts1 = added_lead_variant.split("/");
                  //  handle = parts1[parts1.length - 1];
                  //  handle = handle.replace("#", '');

                  //  $.ajax({
                  //    dataType: 'json',
                  //    async: false,
                  //    url: '/products/' + handle + '.js',
                  //    success: function(product) {
                  //      var var_count = 0;
                  //      selected_variant_id = product["variants"][var_count].id
                  //    }
                  //  });
                  // }

                  // jQuery.getJSON('/cart.js', function(cart) {
                  //  var qty = 0;
                  //  if (cart.items.length > 0) {
                  //    $.each(cart.items, function(key, value) {
                  //      if (selected_variant_id == value.variant_id) {
                  //        qty = value.quantity;

                  //      }
                  //    })
                  //  }
                  //  if (qty != 0) {
                  //    qty = qty - 1;
                  //  }
                  //  $.ajax({
                  //    type: 'POST',
                  //    url: '/cart/change.js',
                  //    dataType: 'json',
                  //    data: {
                  //      quantity: qty,
                  //      id: selected_variant_id
                  //    },
                  //    success: function(data) {}
                  //  });
                  // });
                  cartredirection_whenupsellupgrade = true;
                }
                var thistext = thiselement.find('span').text();
                var upsell_id = thiselement.attr('sell-id');
                var individual_product_id = thiselement.attr('ind_product_id');
                // console.log($(this).closest('form').serialize());
                var formData = $(this).closest('form').serialize();
                if (product_selling_plan_value != undefined) {
                  var purchaseOption = product_selling_plan_value
                  if (purchaseOption === 'one_time_purchase' && selling_plan_id != undefined) {
                    formData = formData.replace(/&?selling_plan=[^&]*/, ''); 
                  }
                }

                if (purchaseOption == undefined || purchaseOption == null) {
                  formData = formData.replace(/&?selling_plan=[^&]*/, ''); 
                }
                
                if(lead_product_data_plan == true && lead_product_data_plan_count != 0) {
                    formData = $(this).closest('form').serialize();
                }

                var m_price = $('.main_price').val();
                var token1 = generateToken();
                var params = {
                  type: 'POST',
                  url: '/cart/add.js',
                  data: formData,
                  dataType: 'json',
                  success: function(line_item) {
                    thiselement.prop('disabled', false);
                    thiselement.attr('style', originalStyle);

                    if ((typeof callback) === 'function') {} else {
                      var all = $.featherlight.opened();
                      $.ajax({
                        crossOrigin: true,
                        url: url,
                        success: function(data) {
                          var sellup_id = upsell_id;
                          var sub_url = 'https://analytics-sellup.herokuapp.com';
                          // var upsell_type = data["upsell_type"]["upsell_type"];     
                          if (sellup_id != "") {
                            $.post(sub_url + '/upsell_views', {
                              shop: shop_name,
                              individual_product_id: individual_product_id,
                              sellup_id: sellup_id,
                              visit_token: token1,
                              event_type: "$click",
                              main_price: m_price,
                              visitor_token: token1,
                              product_id: product_id,
                              time: Math.round(+new Date() / 1000)
                            }).always(function() {

                            });
                          } else {

                          }

                          if (setting['productpgae_redirection'] == true && upsell_offer_type == 'onpage') {
                            // if (data["upsell_type"] == null) {

                            // } else {
                              // if (all != '' && all['0']['target'] == ".upsellmyPopup") {
                              //  $('form[action^="/cart/add"] button[type=submit]').click();
                              // }
                              setTimeout(function() {
                                window.location.reload();
                              }, 500);
                            // }
                          }
                        }
                      })

                      if (setting.enable_ajax == true || upsell_offer_type == 'action') {
                        if (offer_type == "upsell") {
                          if (setting.action_atc_selected_text != '') {
                            $(thiselement).find('span').text(setting.action_atc_selected_text);
                          } else {
                            $(thiselement).find('span').text("Selected");
                          }
                        } else {
                          if (setting.button_text_on_ajax != '') {
                            $(thiselement).find('span').text(setting.button_text_on_ajax);
                          } else {
                            $(thiselement).find('span').text("Added");
                          }

                          // Adding 'Added' to origin add button as well
                          if (thiselement.hasClass("launchtip_upsellpopup_design")) {
                            if (setting.button_text_on_ajax != '') {
                              $("button.openbox[data-target='product_"+individual_product_id+"_"+upsell_id+"']").find('span').text(setting.button_text_on_ajax);
                            } else {
                              $("button.openbox[data-target='product_"+individual_product_id+"_"+upsell_id+"']").find('span').text("Added");
                            }
                          }
                        }
                        if (setting.button_text_change_duration != '' && setting.button_text_change_duration != null) {
                          setTimeout(function() {
                            $(thiselement).find('span').text(thistext)
                          }, setting.button_text_change_duration * 1000);
                        } else {
                          // setTimeout(function(){ $(thiselement).find('span').text(thistext) }, 4000);  
                        }
                        if (upsell_action_data != "") {

                        } else {
                          // console.log('else 743')
                          setTimeout(function() {
                            $(".featherlight-close").trigger('click');
                          }, 1000);
                        }
                      } else {
                        // if (all != '' && all['0']['target'] == ".upsellmyPopup") {
                        //  $('form[action^="/cart/add"] button[type=submit]').click();
                        // }
                        // setTimeout(function() {
                        //  window.location.reload();
                        // }, 500);
                      }

                    }
                    // to close variant popup after select variant
                    var all = $.featherlight.opened();

                    if (upsell_offer_type == 'onpage' && all.length == 1 && all['0']['target'] != ".upsellmyPopup") {
                      var last = all[0];
                      last.close()
                    } else if (upsell_offer_type == 'action' && all.length == 2) {
                      var last = all[1];
                      last.close()
                    }
                  },
                  error: function(XMLHttpRequest, textStatus) {
                    erroroncart(XMLHttpRequest, textStatus);
                  }
                };

                if (offer_type == "upsell") {
                  setTimeout(function() {
                    $.ajax(params);
                  }, 3000);
                } else {
                  setTimeout(function() {
                    $.ajax(params);
                  }, 1000);
                }
              });

              $(document).on("click",".onpage_new_offer_toggler",function(e) {
                let is_new_offers_wrapper_visible = $(this).prev(".more_onpage_offers").is(':visible');
                var txt = is_new_offers_wrapper_visible ? compact_mode_offers_data["offers_expend_text"] : compact_mode_offers_data["offers_shrink_text"];
                var remove_class = is_new_offers_wrapper_visible ? 'upArrow' : 'downArrow';
                var add_class = is_new_offers_wrapper_visible ? 'downArrow' : 'upArrow';
                $(this).find('span').text(txt);
                $(this).find('i').removeClass(remove_class).addClass(add_class);
                $(this).prev('.more_onpage_offers').slideToggle(100);
              });

              $(document).on("click",".upsell_redirect_to_product",function(e) {
                e.preventDefault();

                var individual_product_id = $(this).attr('ind_product_id');
                var m_price = $(this).closest('form').find('.main_price').val();
                var token1 = generateToken();
                var sellup_id = $(this).attr('sell-id');
                var product_id = __st.rid;
                var sub_url = 'https://analytics-sellup.herokuapp.com';
                var r_link = $(this).attr("href");

                $.post(sub_url + '/upsell_views', {
                  shop: shop_name,
                  individual_product_id: individual_product_id,
                  sellup_id: sellup_id,
                  visit_token: token1,
                  event_type: "$click",
                  main_price: m_price,
                  visitor_token: token1,
                  product_id: product_id,
                  time: Math.round(+new Date() / 1000)
                }).done(function() {
                  window.location.replace(r_link);
                  // window.location.href = r_link;
                }).always(function() {

                });
              });

              var producthtml = function(ind_product_id, sellup_id, handle, count, upsell_setting, selected_id, upsell_col_id,action_type) {
                var base_url = 'https://sellup.herokuapp.com';
                if(action_type == 'action_offer' && action_type != undefined && action_type != null){
                  class_data_variable_variant = 'launchtip_action_offer';
                }

                var prod = null;
                $.ajax({
                  dataType: 'json',
                  async: false,
                  url: window.Shopify.routes.root + 'products/' + handle + '.js',

                  success: function(product) {
                    prod = product;
                  },
                  error: function() {
                   var url1 = base_url + '/output/upsell_offer_product_data.json?shop=' + shop_name + '&product_id=' + ind_product_id;
                   var shop_locale = Shopify.locale
                    $.ajax({
                      dataType: 'json',
                      async: false,
                      url: url1,
                      data: {
                        shop_locale: shop_locale
                      },
                      success: function(product) {
                       const product_data = product.upsell_offer_product;
                       const translate_handle = product.translated_handle;
                        let handle1 = translate_handle || product_data.handle;
                        $.ajax({
                          dataType: 'json',
                          async: false,
                          url: window.Shopify.routes.root + 'products/' + handle1 + '.js',
                          success: function(product) {
                            prod = product;                            
                          },
                            error: function() {
                            }
                        });

                      },
                      error: function() {
                      }
                    })
                  }
                })
                if (prod == null) {
                  return ''
                } else {
                  var titlestyletoapply = '';
                  if (setting.title_font_size != '' && setting.title_font_size != null) {
                    titlestyletoapply += 'font-size:' + setting.title_font_size + 'px;'
                  }
                  if (setting.up_title_font_color != '' && setting.up_title_font_color != null) {
                    titlestyletoapply += 'color:' + setting.up_title_font_color + ';';
                  }

                  var pricestyletoapply = '';
                  if (setting.up_price_font_size != '' && setting.up_price_font_size != null) {
                    pricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                  }
                  if (setting.up_price_font_color != '' && setting.up_price_font_color != null) {
                    pricestyletoapply += 'color:' + setting.up_price_font_color + ';';
                  }

                  var comppricestyletoapply = '';
                  if (setting.up_comp_price_font_size != '' && setting.up_comp_price_font_size != null) {
                    comppricestyletoapply += 'font-size:' + setting.up_comp_price_font_size + 'px;'
                  }
                  if (setting.up_comp_price_font_color != '' && setting.up_comp_price_font_color != null) {
                    comppricestyletoapply += 'color:' + setting.up_comp_price_font_color + ';';
                  }

                  var vcount = $.map(prod["variants"], function(n, i) {
                    return i;
                  }).length;


                  if (selected_id != '') {
                    var selected_variant = $.grep(prod["variants"], function(element, index) {
                      return element.id == selected_id && element.available;
                    })[0];

                    if (!selected_variant) {
                      return '';
                    }

                    if (typeof selected_variant !== 'undefined' && typeof selected_variant["featured_image"] !== 'undefined' && selected_variant["featured_image"] != null) {
                      var selected_variant_img = selected_variant["featured_image"]["src"];
                    } else {
                      var selected_variant_img = prod["featured_image"];
                    }
                  } 
                  else {
                    var selected_variant = prod["variants"][0]
                    if (vcount == 1) {
                      var selected_id = selected_variant["id"]
                    }
                    var selected_variant_img = prod["featured_image"];
                  }
                  if (typeof selected_variant === 'undefined') {
                    var selected_variant = prod["variants"][0]
                  }

                  var firstvariantprice = selected_variant["price"];
                  var firstvariantcprice = selected_variant["compare_at_price"];
                  var cp_html = '';

                  if ((firstvariantcprice) && (firstvariantcprice != '') && (firstvariantcprice > firstvariantprice)) {
                    var comp_text = '';

                    if (setting.up_comp_price_text != '') {
                      comp_text = setting.up_comp_price_text;
                    }

                    var final_price_v = Shopify.formatMoneySellUp(firstvariantcprice);

                    if (Shopify.currency['active'] == 'JPY' || Shopify.currency['active'] == 'LBP') {
                      var firstvariantcprice = final_price_v.substring(0, final_price_v.length - 3);
                    } else {
                      var firstvariantcprice = final_price_v;
                    }
                    var pricestyletoapply = '';
                    var comppricestyletoapply = '';
                    var pricestyletoapply = '';
                    if (setting.up_price_font_size != '' && setting.up_price_font_size != null) {
                      pricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                      pricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                      comppricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                    }
                    if (setting.up_price_font_color != '' && setting.up_price_font_color != null) {
                      pricestyletoapply += 'color:' + setting.up_price_font_color + ';';
                    }
                    if (setting.up_comp_price_font_color != '' && setting.up_comp_price_font_color != null) {
                      comppricestyletoapply += 'color:' + setting.up_comp_price_font_color + ';';
                    }
                    comppricestyletoapply += 'margin-right: 10px;'

                    cp_html = '<span class="compareprice launchtip_price" style="text-decoration: line-through;' + comppricestyletoapply + '">' + comp_text + ' ' + firstvariantcprice + '</span>'
                  } else {
                    cp_html = '';
                    //cp_html = '<span class="compareprice price" style="'+comppricestyletoapply+'"></span>';
                  }

                  var btn_text = '';
                  var goto_pro_or_not = redirect_to_product_or_not(count);

                  if (upsell_setting.action_offer_type == 'upsell') {
                    if (setting.action_atc_button_text != "" && setting.action_atc_button_text !== null) {
                      btn_text = setting.action_atc_button_text;
                    } else {
                      btn_text = "Select";
                    }
                  } else if (goto_pro_or_not == true){
                    btn_text = setting.redirect_to_product_text != '' ? setting.redirect_to_product_text : "Customize";
                  } else {
                    if (setting.up_button_text != "" && setting.up_button_text !== null) {
                      btn_text = setting.up_button_text;
                    } else {
                      btn_text = "Add";
                    }
                  }

                  if (upsell_setting.upsell_type == 'action') {
                    var popup_ct_val = "a";
                  } else if (upsell_setting.upsell_type == 'onpage') {
                    var popup_ct_val = "p";
                  }

                  var btnstyletoapply = '';
                  if (setting.up_button_font_size != '') {
                    btnstyletoapply += 'font-size:' + setting.up_button_font_size + 'px;'
                  }
                  if (setting.up_button_bg_color != '') {
                    btnstyletoapply += 'background-color:' + setting.up_button_bg_color + ';';
                  }
                  if (setting.up_button_font_color != '') {
                    btnstyletoapply += 'color:' + setting.up_button_font_color + ';';
                  }

                  var popup_btn_text = '';
                  if (setting.popup_button_text != "" && setting.popup_button_text !== null) {
                    popup_btn_text = setting.popup_button_text;
                  } else {
                    popup_btn_text = "Add this";
                  }
                  var popup_btnstyletoapply = '';

                  if (setting.up_button_bg_color != '') {
                    popup_btnstyletoapply += 'background-color:' + setting.up_button_bg_color + ';';
                  }
                  if (setting.up_button_font_color != '') {
                    popup_btnstyletoapply += 'color:' + setting.up_button_font_color + ';';
                  }
                  if (setting.up_button_font_size != '') {
                    popup_btnstyletoapply += 'font-size:' + setting.up_button_font_size + 'px;';
                  }
                  if (setting.parent_attribution == true) {
                    var parent_attribution_content = '<input type="hidden" name="properties[added]" value="' + mainproduct_title + '">';
                  }else{
                    var parent_attribution_content = '';
                  }

                  function redirect_to_product_or_not(i) {
                    var rtpon = true;
                    switch (i) { 
                      case 0: 
                        if (upsell_setting.upseller_redirect_to_product == true) {
                          rtpon = true;
                        } else if (upsell_setting.upseller_redirect_to_product == false) {
                          rtpon = false;
                        }
                        break;
                      case 1: 
                        if (upsell_setting.upseller_redirect_to_product_2 == true) {
                          rtpon = true;
                        } else if (upsell_setting.upseller_redirect_to_product_2 == false) {
                          rtpon = false;
                        }
                        break;
                      case 2: 
                        if (upsell_setting.upseller_redirect_to_product_3 == true) {
                          rtpon = true;
                        } else if (upsell_setting.upseller_redirect_to_product_3 == false) {
                          rtpon = false;
                        }
                        break;
                      case 3: 
                        if (upsell_setting.upseller_redirect_to_product_4 == true) {
                          rtpon = true;
                        } else if (upsell_setting.upseller_redirect_to_product_4 == false) {
                          rtpon = false;
                        }
                        break;
                      case 4: 
                        if (upsell_setting.upseller_redirect_to_product_5 == true) {
                          rtpon = true;
                        } else if (upsell_setting.upseller_redirect_to_product_5 == false) {
                          rtpon = false;
                        }
                        break;
                      case 5: 
                        if (upsell_setting.upseller_redirect_to_product_6 == true) {
                          rtpon = true;
                        } else if (upsell_setting.upseller_redirect_to_product_6 == false) {
                          rtpon = false;
                        }
                        break;
                      case 6: 
                        if (upsell_setting.upseller_redirect_to_product_7 == true) {
                          rtpon = true;
                        } else if (upsell_setting.upseller_redirect_to_product_7 == false) {
                          rtpon = false;
                        }
                        break;
                      case 7: 
                        if (upsell_setting.upseller_redirect_to_product_8 == true) {
                          rtpon = true;
                        } else if (upsell_setting.upseller_redirect_to_product_8 == false) {
                          rtpon = false;
                        }
                        break;
                    }

                    return rtpon;
                  }

                  function price_get(i) {
                    var product_price = '';
                    if (Shopify.currency['active'] == 'SEK') {
                      firstvariantprice = firstvariantprice.toString()
                      final_price_v = firstvariantprice.substring(0, firstvariantprice.length - 2);
                      final_price_v = final_price_v + " kr";
                    } else {
                      var final_price_v = Shopify.formatMoneySellUp(firstvariantprice);
                    }
                    var main_price = (Math.round(firstvariantprice) / 100).toFixed(2);
                    if (Shopify.currency['active'] == 'JPY' || Shopify.currency['active'] == 'LBP') {
                      var new_price = final_price_v.substring(0, final_price_v.length - 3);
                    } else {
                      var new_price = final_price_v;
                    }

                    if (setting.up_price_show_hide == "show" && upsell_setting.upsell_type == 'action') {
                      var price_text = '';
                      if (setting.up_price_text != '' && cp_html != '') {
                        price_text = setting.up_price_text;
                      }

                      product_price = '<div class="detail_price">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                    }
                    else{
                      switch (i) {
                        case 0: 
                          if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price == false) {
                            var price_text = '';
                            if (setting.up_price_text != '' && cp_html != '') {
                              price_text = setting.up_price_text;
                            }

                            product_price = '<div class="detail_price">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>'

                          }
                          break;
                        case 1: 
                          if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_2 == false) {
                            var price_text = '';
                            if (setting.up_price_text != '' && cp_html != '') {
                              price_text = setting.up_price_text;
                            }

                            product_price = '<div class="detail_price">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                          }
                          break;
                        case 2: 
                          if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_3 == false) {
                            var price_text = '';
                            if (setting.up_price_text != '' && cp_html != '') {
                              price_text = setting.up_price_text;
                            }

                            product_price = '<div class="detail_price">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                          }
                          break;
                        case 3: 
                          if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_4 == false) {
                            var price_text = '';
                            if (setting.up_price_text != '' && cp_html != '') {
                              price_text = setting.up_price_text;
                            }

                            product_price = '<div class="detail_price">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                          }
                          break;
                        case 4: 
                          if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_5 == false) {
                            var price_text = '';
                            if (setting.up_price_text != '' && cp_html != '') {
                              price_text = setting.up_price_text;
                            }

                            product_price = '<div class="detail_price">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                          }
                          break;
                        case 5: 
                          if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_6 == false) {
                            var price_text = '';
                            if (setting.up_price_text != '' && cp_html != '') {
                              price_text = setting.up_price_text;
                            }

                            product_price = '<div class="detail_price">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                          }
                          break;
                        case 6: 
                          if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_7 == false) {
                            var price_text = '';
                            if (setting.up_price_text != '' && cp_html != '') {
                              price_text = setting.up_price_text;
                            }

                            product_price = '<div class="detail_price">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                          }
                          break;
                        case 7: 
                          if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_8 == false) {
                            var price_text = '';
                            if (setting.up_price_text != '' && cp_html != '') {
                              price_text = setting.up_price_text;
                            }

                            product_price = '<div class="detail_price">' + cp_html + '<span class="launchtip_price" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</span><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                          }
                          break;
                      }
                    }

                    return product_price;
                  }

                  function title_get(i) {
                    var product_title = '';
                    switch (i) { 
                      case 0: 
                        if (upsell_setting.upseller_product_title_set == "product") {
                          product_title = prod["title"];
                        } else if (upsell_setting.upseller_product_title_set == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title;
                        }
                        break;
                      case 1: 
                        if (upsell_setting.upseller_product_title_set_2 == "product") {
                          product_title = prod["title"];
                        } else if (upsell_setting.upseller_product_title_set_2 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_2;
                        }
                        break;
                      case 2: 
                        if (upsell_setting.upseller_product_title_set_3 == "product") {
                          product_title = prod["title"];
                        } else if (upsell_setting.upseller_product_title_set_3 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_3;
                        }
                        break;
                      case 3: 
                        if (upsell_setting.upseller_product_title_set_4 == "product") {
                          product_title = prod["title"];
                        } else if (upsell_setting.upseller_product_title_set_4 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_4;
                        }
                        break;
                      case 4: 
                        if (upsell_setting.upseller_product_title_set_5 == "product") {
                          product_title = prod["title"];
                        } else if (upsell_setting.upseller_product_title_set_5 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_5;
                        }
                        break;
                      case 5: 
                        if (upsell_setting.upseller_product_title_set_6 == "product") {
                          product_title = prod["title"];
                        } else if (upsell_setting.upseller_product_title_set_6 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_6;
                        }
                        break;
                      case 6: 
                        if (upsell_setting.upseller_product_title_set_7 == "product") {
                          product_title = prod["title"];
                        } else if (upsell_setting.upseller_product_title_set_7 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_7;
                        }
                        break;
                      case 7: 
                        if (upsell_setting.upseller_product_title_set_8 == "product") {
                          product_title = prod["title"];
                        } else if (upsell_setting.upseller_product_title_set_8 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_8;
                        }
                        break;
                    }

                    return product_title;
                  }

                  var link_html = '';
                  var vhtml = '';
                  var voption1 = '';
                  var vselectlist = '';                  

                  if (selected_id == '') {
                    // selected_id = prod["variants"][0]["id"]
                    $.each(prod["variants"], function(key, value) {
                      voption1 += '<option value="' + value.id + '">' + value.title + '</option></option>'
                    })

                    vselectlist = '<select name="id" class="launchtip_select_wrapper" style="display:none;">' + voption1 + '</select>'
                    var allprodoption = '';

                    $.each(prod["options"], function(key, value) {
                      var voptionlist = '';
                      var select_lable = "<label>" + value.name + "</label>";
                      $.each(value["values"], function(key1, val) {
                        voptionlist += '<option value="' + val + '">' + val + '</option>'
                      })

                      voptionselectlist = '<div class="launchtip_select_option_wrapper">' + select_lable + '<select class="launchtip_select_option_list">' + voptionlist + '</select></div>'
                      allprodoption += voptionselectlist
                    })

                    if(setting.up_quantity_show_hide == 'show' && goto_pro_or_not == false){
                      allprodoption += '<div class="launchtip_select_option_wrapper"><label>Quantity</label><input type="number" name="quantity" min="1" value="1" title="Quantity" style="width: 50%;"></div>'
                      var qty_hidden_field = '';
                    }else{
                      var qty_hidden_field = '<input type="hidden" name="quantity" value="1" tabindex="-1">';
                    }

                    if (setting.parent_attribution == true) {
                      var params_parent_attribution_content = '&par_att_con='+mainproduct_title;
                    }else{
                      var params_parent_attribution_content = '';
                    }

                    if (goto_pro_or_not == true) {
                      btn_text = setting.redirect_to_product_text != '' ? setting.redirect_to_product_text : "Customize";;
                      var popupform_button_html = '<button href="'+window.Shopify.routes.root+'products/'+prod["handle"]+'?upsell_id='+sellup_id+params_parent_attribution_content+'" ind_product_id="' + ind_product_id + '" sell-id="' + sellup_id + '" title="' + selected_variant.title + '" action-type="' + upsell_setting.action_offer_type + '" upsell-type="' + upsell_setting.upsell_type + '" class="btn add-to-cart launchtip_upsellpopup_design upsell_redirect_to_product" style="' + popup_btnstyletoapply + 'border: none;cursor: pointer;width: 100%;" ><span class="add-to-cart__text" data-text="' + btn_text + '">' + btn_text + '</span></button>';
                    }else{
                      var popupform_button_html = '<button type="submit" name="add" ind_product_id="' + ind_product_id + '" sell-id="' + sellup_id + '" title="' + selected_variant.title + '" action-type="' + upsell_setting.action_offer_type + '" upsell-type="' + upsell_setting.upsell_type + '" class="btn add-to-cart launchtip_add_to_cart launchtip_upsellpopup_design" style="' + popup_btnstyletoapply + 'border: none;cursor: pointer;width: 100%;" ><span class="add-to-cart__text" data-text="' + btn_text + '">' + btn_text + '</span></button>';
                    }
                   var selling_plan_field = (prod["selling_plan_groups"].length > 0) ? '<input type="hidden" name="selling_plan" value="' + prod["selling_plan_groups"][0]["selling_plans"][0]["id"] + '">' : '';
                    var popupform = '<form action="#" method="post" class="LaunchTipAddToCartForm launchtipsellupform" enctype="multipart/form-data">\
                                  <div class="provariantdata" style="display:none;">' + JSON.stringify(prod) + '</div>\
                                  <div class="popupmsg" style="height:0;"></div>\
                                  <div class="popuppricediv">' + price_get(count) + '</div>\
                                  ' + vselectlist + '<div class="launchtip_select_options_div">' + allprodoption + '</div>'+ qty_hidden_field +'<input type="hidden" name="properties[_sellup_id]" value="' + sellup_id + '">'+ selling_plan_field +parent_attribution_content+popupform_button_html+'</form>'

                  } else {}

                  if (vcount > 0) {
                    vhtml = '<input type="hidden" name="id" value="' + selected_id + '">'
                  } else {
                    var voption = '';
                    $.each(prod["variants"], function(key, value) {
                      voption += '<option value="' + value.id + '">' + value.title + '</option></option>'
                    })
                    vhtml = '<select name="id" class="launchtip_select_wrapper">' + voption + '</select>'
                  }

                  if(setting.up_quantity_show_hide == 'show' && goto_pro_or_not == false){
                    var qty_hidden_field = '<input type="number" name="quantity" min="1" value="1" title="Quantity">';
                  }else{
                    var qty_hidden_field = '<input type="hidden" name="quantity" value="1" tabindex="-1">';
                  }

                  if (setting.parent_attribution == true) {
                    var params_parent_attribution_content = '&par_att_con='+mainproduct_title;
                  }else{
                    var params_parent_attribution_content = '';
                  }

                  if (goto_pro_or_not == true) {
                    var button_html = '<button href="'+window.Shopify.routes.root+'products/'+prod["handle"]+'?upsell_id='+sellup_id+params_parent_attribution_content+'" ind_product_id="' + ind_product_id + '" sell-id="' + sellup_id + '" title="' + selected_variant.title + '" action-type="' + upsell_setting.action_offer_type + '" upsell-type="' + upsell_setting.upsell_type + '" class="btn add-to-cart launchtip_upsell_design upsell_redirect_to_product" style="' + btnstyletoapply + 'border: none;cursor: pointer;" ><span class="add-to-cart__text">' + btn_text + '</span></button>';
                  }else{
                    var button_html = '<button type="submit" name="add" ind_product_id="' + ind_product_id + '" sell-id="' + sellup_id + '" title="' + selected_variant.title + '" action-type="' + upsell_setting.action_offer_type + '" upsell-type="' + upsell_setting.upsell_type + '" class="btn add-to-cart launchtip_add_to_cart launchtip_upsell_design" style="' + btnstyletoapply + 'border: none;cursor: pointer;" ><span class="add-to-cart__text">' + btn_text + '</span></button>';
                  }


                    if (vcount > 0) {
                      if (prod["selling_plan_groups"].length > 0){
                       selling_plan_id = prod["selling_plan_groups"][0]["selling_plans"][0]["id"];
                        var selling_plan_hidden = '<input type="hidden" name="selling_plan" value="' + selling_plan_id + '">'
                        link_html = '<form action="#" method="post" class="LaunchTipAddToCartForm LaunchTipAddToCartForm" enctype="multipart/form-data">\
                          ' + vhtml + '\
                          '+ qty_hidden_field +'\
                          <input type="hidden" name="properties[_sellup_id]" value="' + sellup_id + '">\
                          ' + selling_plan_hidden + '\
                          '+parent_attribution_content+button_html+'</form>';
                      }else{
                         link_html = '<form action="#" method="post" class="LaunchTipAddToCartForm LaunchTipAddToCartForm" enctype="multipart/form-data">\
                          ' + vhtml + '\
                          '+ qty_hidden_field +'\
                          <input type="hidden" name="properties[_sellup_id]" value="' + sellup_id + '">\
                          '+parent_attribution_content+button_html+'</form>';
                      }
                    }

                  var popup_heading_text_value = '';
                  if (setting.popup_heading_text != '') {
                    popup_heading_text_value = setting.popup_heading_text;
                  }

                  var productboxstyletoapply = '';
                  var applyborderstyle = false;
                  if (setting.up_border_top_size != '') {
                    productboxstyletoapply += 'border-top-width:' + setting.up_border_top_size + 'px;'
                    applyborderstyle = true;
                  }
                  if (setting.up_border_left_size != '') {
                    productboxstyletoapply += 'border-left-width:' + setting.up_border_left_size + 'px;'
                    applyborderstyle = true;
                  }
                  if (setting.up_border_right_size != '') {
                    productboxstyletoapply += 'border-right-width:' + setting.up_border_right_size + 'px;'
                    applyborderstyle = true;
                  }
                  if (setting.up_border_bottom_size != '') {
                    productboxstyletoapply += 'border-bottom-width:' + setting.up_border_bottom_size + 'px;'
                    applyborderstyle = true;
                  }
                  if (setting.up_border_color != '') {
                    productboxstyletoapply += 'border-color:' + setting.up_border_color + ';';
                    applyborderstyle = true;
                  }
                  if (setting.up_border_padding != '') {
                    productboxstyletoapply += 'padding:' + setting.up_border_padding + 'px;';
                    applyborderstyle = true;
                  }
                  if (productboxstyletoapply == true) {
                    productboxstyletoapply += 'border-style:solid;';
                  }
                  var title_font_css = '';
                  if (setting.up_title_price_select_font != '') {
                    var font = setting.up_title_price_select_font.replace(/\+/g, ' ');
                    font = font.split(':');
                    title_font_css += 'font-family:' + font[0];
                  }

                  if (setting.title_font_size == '') {
                     title_font_css += 'font-size: 14px;';
                  }

                  if (selected_id == '' && vcount > 1) {
                    var popup_btnstyletoapply = '';
                    if (setting.up_button_bg_color != '') {
                      popup_btnstyletoapply += 'background-color:' + setting.up_button_bg_color + ';';
                    }
                    if (setting.up_button_font_color != '') {
                      popup_btnstyletoapply += 'color:' + setting.up_button_font_color + ';';
                    }
                    if (setting.up_button_font_size != '') {
                      popup_btnstyletoapply += 'font-size:' + setting.up_button_font_size + 'px;';
                    }
                    // var finalhtml_button = '<a class="btn btn-default" href="#" data-featherlight="#fl'+count+'">'+btn_text+'</a>';
                    var finalhtml_button = '<button data-target="product_'+prod["id"]+'_'+sellup_id+'" class="btn openbox launchtip_upsell_design" style="' + popup_btnstyletoapply + 'border: none;cursor: pointer;" href="#fl' + count + upsell_col_id + popup_ct_val + '"><span class="add-to-cart__text">' + btn_text + '</span></button>';
                  } else {
                    var finalhtml_button = link_html;
                  }
                  // console.log(prod["variants"]);
                  var var_in_stock = false;
                  $.each(prod["variants"], function(key, value) {
                    if (value.available == true) {
                      var_in_stock = true;
                    }
                  })
                  if (vcount == 1 && selected_variant.available == false) {
                    return '';
                  } else if (vcount > 1 && var_in_stock == false && upsell_setting.upsell_type == 'onpage') {
                    return '';
                  } else {
                    var product_image_container = '<div class="image upline">\
                        <a href="'+window.Shopify.routes.root+'products/' + prod["handle"] + '">\
                          <img style="width: 60px;height: auto;display: block;" src="' + selected_variant_img + '" alt="'+prod["title"].replace(/"/g, '').replace(/'/g, '')+'" />\
                        </a>\
                      </div>';
                    if (selected_variant_img == null) {
                      product_image_container = "";
                    }
                    var subscriptionAttribute = '';
                    var selling_plan_product_exit = 'launchtip_data-selling-plan-product-exit="false"';

                    // Only add attribute if requires_selling_plan exists
                    
                    if (prod["requires_selling_plan"] !== undefined) {
                        subscriptionAttribute = ' launchtip_data-requires-selling-plan="' + prod["requires_selling_plan"] + '"';
                    }
                    if(prod["selling_plan_groups"] && prod["selling_plan_groups"].length > 0) {
                      selling_plan_product_exit = 'launchtip_data-selling-plan-product-exit="true"';
                    }
                    var requiresSellingPlan = prod["requires_selling_plan"] === true ? 'true' : 'false';
                    if (prod["selling_plan_groups"] && prod["selling_plan_groups"].length > 0 && lead_product_data_plan == false  && lead_product_data_plan_count < 0)
                    {return '';}
                    if (prod["selling_plan_groups"] && prod["selling_plan_groups"].length == 0 && lead_product_data_plan == true  && lead_product_data_plan_count > 0)
                    {return '';}

                    return '<div id="product-' + prod["handle"] + '" style="' + productboxstyletoapply + '" class="item ' + convertToSlug(upsell_setting.upseller_name) + ' productbox upsellproductcount' + count + ' ' + class_data_variable_variant + '"' + subscriptionAttribute + ' ' + selling_plan_product_exit + '>\
                      '+ product_image_container +'\
                      <div class="details  upline" style="' + title_font_css + '">\
                      <a class="detail_title" href="' + window.Shopify.routes.root + 'products/' + prod["handle"] + '">\
                      <span class="title" style="' + titlestyletoapply + '" title="' + title_get(count) + '">' + title_get(count) + '</span>\
                      </a>\
                      ' + price_get(count) + '\
                      </div>\
                      <div class="action  upline">\
                      \
                      <div class="launchtip_upsell_lightbox launchtiplightbox upsell_variants" id="fl' + count + upsell_col_id + popup_ct_val + '">\
                      <h3>' + popup_heading_text_value + '</h3>\
                      <div class="lbimg">\
                      ' + (selected_variant_img ? '<img style="max-width: 250px;height: auto;width:100%;margin: auto;display: block;" class="lightboximage" src="' + selected_variant_img + '" alt="' + prod["title"].replace(/"/g, '').replace(/'/g, '') + '" />' : '') + '\
                      ' + popupform + '\
                      </div>\
                      </div>\
                      \
                      ' + finalhtml_button + '\
                      </div>\
                      </div>\
                    '
                  }
                }
              } 

              var producthtml_onpage_checkbox = function(ind_product_id, sellup_id, handle, count, upsell_setting, selected_id, upsell_col_id,offer_type) {
                var prod = null;
                $.ajax({
                  dataType: 'json',
                  async: false,
                  url: window.Shopify.routes.root + 'products/' + handle + '.js',

                  success: function(product) {
                    prod = product;
                  },
                  error: function() {

                   var url1 = base_url + '/output/upsell_offer_product_data.json?shop=' + shop_name + '&product_id=' + ind_product_id;
                   var shop_locale = Shopify.locale
                    $.ajax({
                      dataType: 'json',
                      async: false,
                      url: url1,
                      data: {
                        shop_locale: shop_locale
                      },
                      success: function(product) {
                       const product_data = product.upsell_offer_product;
                       const translate_handle = product.translated_handle;
                        let handle1 = translate_handle || product_data.handle;
                        $.ajax({
                          dataType: 'json',
                          async: false,
                          url: window.Shopify.routes.root + 'products/' + handle1 + '.js',
                          success: function(product) {
                            prod = product;
                            
                          },
                            error: function() {
                            }
                        });

                      },
                      error: function() {
                      }
                    })

                  }
                })
                if (prod == null) {
                  return ''
                } else {
                  var titlestyletoapply = '';
                  if (setting.title_font_size != '' && setting.title_font_size != null) {
                    titlestyletoapply += 'font-size:' + setting.title_font_size + 'px;'
                    // titlestyletoapply += 'line-height:' + (parseInt(setting.title_font_size)+4) + 'px;'
                  }
                  if (setting.up_title_font_color != '' && setting.up_title_font_color != null) {
                    titlestyletoapply += 'color:' + setting.up_title_font_color + ';';
                  }

                  var pricestyletoapply = '';
                  if (setting.up_price_font_size != '' && setting.up_price_font_size != null) {
                    pricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                  }
                  if (setting.up_price_font_color != '' && setting.up_price_font_color != null) {
                    pricestyletoapply += 'color:' + setting.up_price_font_color + ';';
                  }

                  var comppricestyletoapply = '';
                  if (setting.up_comp_price_font_size != '' && setting.up_comp_price_font_size != null) {
                    comppricestyletoapply += 'font-size:' + setting.up_comp_price_font_size + 'px;'
                  }
                  if (setting.up_comp_price_font_color != '' && setting.up_comp_price_font_color != null) {
                    comppricestyletoapply += 'color:' + setting.up_comp_price_font_color + ';';
                  }

                  var vcount = $.map(prod["variants"], function(n, i) {
                    return i;
                  }).length;

                  if (selected_id != '') {
                    var selected_variant = $.grep(prod["variants"], function(element, index) {
                      return element.id == selected_id && element.available;
                    })[0];
                    if (!selected_variant) {
                      return '';
                    }
                    
                    if (typeof selected_variant !== 'undefined' && typeof selected_variant["featured_image"] !== 'undefined' && selected_variant["featured_image"] != null) {
                      var selected_variant_img = selected_variant["featured_image"]["src"];
                    } else {
                      var selected_variant_img = prod["featured_image"];
                    }
                  } else {
                    var selected_variant = prod["variants"][0]
                    if (vcount == 1) {
                      var selected_id = selected_variant["id"]
                    }
                    var selected_variant_img = prod["featured_image"];
                  }
                  if (typeof selected_variant === 'undefined') {
                    var selected_variant = prod["variants"][0]
                  }

                  var firstvariantprice = selected_variant["price"];
                  var firstvariantcprice = selected_variant["compare_at_price"];
                  var cp_html = '';

                  if ((firstvariantcprice) && (firstvariantcprice != '') && (firstvariantcprice > firstvariantprice)) {
                    var comp_text = '';

                    if (setting.up_comp_price_text != '') {
                      comp_text = setting.up_comp_price_text;
                    }

                    var final_price_v = Shopify.formatMoneySellUp(firstvariantcprice);

                    if (Shopify.currency['active'] == 'JPY' || Shopify.currency['active'] == 'LBP') {
                      var firstvariantcprice = final_price_v.substring(0, final_price_v.length - 3);
                    } else {
                      var firstvariantcprice = final_price_v;
                    }
                    var pricestyletoapply = '';
                    var comppricestyletoapply = '';
                    var pricestyletoapply = '';
                    if (setting.up_price_font_size != '' && setting.up_price_font_size != null) {
                      pricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                      comppricestyletoapply += 'font-size:' + setting.up_price_font_size + 'px;'
                    }
                    if (setting.up_price_font_color != '' && setting.up_price_font_color != null) {
                      pricestyletoapply += 'color:' + setting.up_price_font_color + ';';
                    }
                    if (setting.up_comp_price_font_color != '' && setting.up_comp_price_font_color != null) {
                      comppricestyletoapply += 'color:' + setting.up_comp_price_font_color + ';';
                    }

                    cp_html = '<p class="comparechprice chprice" style="'+ comppricestyletoapply +'"><del>' + comp_text + ' ' + firstvariantcprice + '</del></p>'
                  } else {
                    cp_html = '';
                    //cp_html = '<span class="compareprice price" style="'+comppricestyletoapply+'"></span>';
                  }

                  var selected_product_title = '';
                  var vselectlist = '';
                  var optionslabel = $.map(prod["options"], function(val) {  
                    return val.name;  
                  }).join(' / ');
                  var voption1 = '<option disabled class="disabled_option">'+optionslabel+'</option></option>';

                  var availablev_prices = [];
                  if (selected_id == '') {
                    // selected_id = prod["variants"][0]["id"]
                    $.each(prod["variants"], function(key, value) {
                      var var_in_stock1 = "";

                      if (value.available == true){
                        availablev_prices.push(value.price)
                      }else{
                        var_in_stock1 = "disabled";
                      }

                      voption1 += '<option value="'+value.id+'" '+var_in_stock1+'>'+value.title+'</option>'
                    })

                    if (availablev_prices.length > 0) {
                      firstvariantprice = availablev_prices["0"];
                    }

                    vselectlist = '<select name="" class="launchtip_check_select_wrapper">' + voption1 + '</select>'
                  } else {
                    $.each(prod["variants"], function(key, value) {
                      if(selected_id == value.id){
                        selected_product_title = value.name;
                        voption1 += '<option value="'+value.id+'" selected>'+value.title+'</option>'
                      }else{
                        voption1 += '<option value="'+value.id+'">'+value.title+'</option>'
                      }
                    })

                    vselectlist = '<select name="" class="launchtip_check_select_wrapper" style="display: none;">' + voption1 + '</select>'
                  }

                  var title_font_css = '';
                  if (setting.up_title_price_select_font != '') {
                    var font = setting.up_title_price_select_font.replace(/\+/g, ' ');
                    font = font.split(':');
                    title_font_css += 'font-family:' + font[0];
                  }

                  if (setting.title_font_size == '') {
                     title_font_css += 'font-size: 14px;';
                  }

                  if (setting.parent_attribution == true) {
                    var parent_attribution_content = '<input type="hidden" name="properties[added]" value="' + mainproduct_title + '">';
                  }else{
                    var parent_attribution_content = '';
                  }

                  if(setting.up_quantity_show_hide == 'show'){
                    var qty_hidden_field = '<input type="number" name="quantity" min="1" value="1" title="Quantity">';
                  }else{
                    var qty_hidden_field = '<input type="hidden" name="quantity" value="1" tabindex="-1">';
                  }

                  //create unique label and ids
                  var selling_plan_field = (prod["selling_plan_groups"].length > 0) ? '<input type="hidden" name="selling_plan"   value="' + prod["selling_plan_groups"][0]["selling_plans"][0]["id"] + '">' : '';
                  if(offer_type == "checkbox"){
                    var label_selector_id =  (selected_id != '') ? selected_id : ind_product_id;
                    var finalhtml_button = qty_hidden_field + '<input type="hidden" name="properties[_sellup_id]" value="' + sellup_id + '">'+parent_attribution_content+' '+selling_plan_field+'\
                      <input type="checkbox" ind_product_id="'+ind_product_id+'" sell-id="'+sellup_id+'" id="onpage_check_'+label_selector_id+'"><label for="onpage_check_'+label_selector_id+'"></label>';
                  }else
                  {
                    var label_selector_id =  (selected_id != '') ? selected_id : ind_product_id;
                     var finalhtml_button = qty_hidden_field +
                      '<input type="hidden" name="properties[_sellup_id]" value="' + sellup_id + '">' +
                      parent_attribution_content +
                      selling_plan_field +
                      '<label class="sellup_toggle_switch">' +
                        '<input type="checkbox" ind_product_id="' + ind_product_id + '" sell-id="' + sellup_id + '" id="onpage_toggle_' + label_selector_id + '">' +
                        '<span class="sellup_toggle_slider round"></span>' +
                      '</label>';


                      if (setting.up_button_bg_color && setting.up_button_bg_color.trim() !== '') {
                          // Dynamically add the CSS for the background color
                          var style = document.createElement('style');
                          style.type = 'text/css';
                          style.innerHTML = `
                              input:checked + .sellup_toggle_slider {
                                  background-color: ${setting.up_button_bg_color} !important;
                              }
                          `;
                          document.head.appendChild(style);
                      }
                    }
                  
                  // end
                  var var_in_stock = false;
                  $.each(prod["variants"], function(key, value) {
                    if (value.available == true) {
                      var_in_stock = true;
                    }
                  })

                  function price_get(i) {
                    var product_price = '';
                    if (Shopify.currency['active'] == 'SEK') {
                      firstvariantprice = firstvariantprice.toString()
                      final_price_v = firstvariantprice.substring(0, firstvariantprice.length - 2);
                      final_price_v = final_price_v + " kr";
                    } else {
                      var final_price_v = Shopify.formatMoneySellUp(firstvariantprice);
                    }
                    var main_price = (Math.round(firstvariantprice) / 100).toFixed(2);
                    if (Shopify.currency['active'] == 'JPY' || Shopify.currency['active'] == 'LBP') {
                      var new_price = final_price_v.substring(0, final_price_v.length - 3);
                    } else {
                      var new_price = final_price_v;
                    }
                    
                    switch (i) {
                      case 0: 
                        if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price == false) {
                          var price_text = '';
                          if (setting.up_price_text != '' && cp_html != '') {
                            price_text = setting.up_price_text;
                          }

                          product_price = '<div class="check_price">' + cp_html + '<p class="chprice" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</p><input type="hidden" value="' + main_price + '" class="main_price"></div>'

                        }
                        break;
                      case 1: 
                        if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_2 == false) {
                          var price_text = '';
                          if (setting.up_price_text != '' && cp_html != '') {
                            price_text = setting.up_price_text;
                          }

                          product_price = '<div class="check_price">' + cp_html + '<p class="chprice" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</p><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                        }
                        break;
                      case 2: 
                        if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_3 == false) {
                          var price_text = '';
                          if (setting.up_price_text != '' && cp_html != '') {
                            price_text = setting.up_price_text;
                          }

                          product_price = '<div class="check_price">' + cp_html + '<p class="chprice" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</p><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                        }
                        break;
                      case 3: 
                        if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_4 == false) {
                          var price_text = '';
                          if (setting.up_price_text != '' && cp_html != '') {
                            price_text = setting.up_price_text;
                          }

                          product_price = '<div class="check_price">' + cp_html + '<p class="chprice" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</p><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                        }
                        break;
                      case 4: 
                        if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_5 == false) {
                          var price_text = '';
                          if (setting.up_price_text != '' && cp_html != '') {
                            price_text = setting.up_price_text;
                          }

                          product_price = '<div class="check_price">' + cp_html + '<p class="chprice" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</p><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                        }
                        break;
                      case 5: 
                        if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_6 == false) {
                          var price_text = '';
                          if (setting.up_price_text != '' && cp_html != '') {
                            price_text = setting.up_price_text;
                          }

                          product_price = '<div class="check_price">' + cp_html + '<p class="chprice" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</p><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                        }
                        break;
                      case 6: 
                        if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_7 == false) {
                          var price_text = '';
                          if (setting.up_price_text != '' && cp_html != '') {
                            price_text = setting.up_price_text;
                          }

                          product_price = '<div class="check_price">' + cp_html + '<p class="chprice" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</p><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                        }
                        break;
                      case 7: 
                        if (setting.up_price_show_hide == "show" && upsell_setting.upseller_hide_price_8 == false) {
                          var price_text = '';
                          if (setting.up_price_text != '' && cp_html != '') {
                            price_text = setting.up_price_text;
                          }

                          product_price = '<div class="check_price">' + cp_html + '<p class="chprice" style="' + pricestyletoapply + '">' + price_text + ' ' + new_price + '</p><input type="hidden" value="' + main_price + '" class="main_price"></div>'
                        }
                        break;
                    }

                    return product_price;
                  }

                  function title_get(i) {
                    var product_title = '';
                    switch (i) { 
                      case 0: 
                        if (upsell_setting.upseller_product_title_set == "product") {
                          if (selected_product_title != '') {
                            product_title = selected_product_title;
                          }else{
                            product_title = prod["title"];
                          }
                        } else if (upsell_setting.upseller_product_title_set == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title;
                        }
                        break;
                      case 1: 
                        if (upsell_setting.upseller_product_title_set_2 == "product") {
                          if (selected_product_title != '') {
                            product_title = selected_product_title;
                          }else{
                            product_title = prod["title"];
                          }
                        } else if (upsell_setting.upseller_product_title_set_2 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_2;
                        }
                        break;
                      case 2: 
                        if (upsell_setting.upseller_product_title_set_3 == "product") {
                          if (selected_product_title != '') {
                            product_title = selected_product_title;
                          }else{
                            product_title = prod["title"];
                          }
                        } else if (upsell_setting.upseller_product_title_set_3 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_3;
                        }
                        break;
                      case 3: 
                        if (upsell_setting.upseller_product_title_set_4 == "product") {
                          if (selected_product_title != '') {
                            product_title = selected_product_title;
                          }else{
                            product_title = prod["title"];
                          }
                        } else if (upsell_setting.upseller_product_title_set_4 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_4;
                        }
                        break;
                      case 4: 
                        if (upsell_setting.upseller_product_title_set_5 == "product") {
                          if (selected_product_title != '') {
                            product_title = selected_product_title;
                          }else{
                            product_title = prod["title"];
                          }
                        } else if (upsell_setting.upseller_product_title_set_5 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_5;
                        }
                        break;
                      case 5: 
                        if (upsell_setting.upseller_product_title_set_6 == "product") {
                          if (selected_product_title != '') {
                            product_title = selected_product_title;
                          }else{
                            product_title = prod["title"];
                          }
                        } else if (upsell_setting.upseller_product_title_set_6 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_6;
                        }
                        break;
                      case 6: 
                        if (upsell_setting.upseller_product_title_set_7 == "product") {
                          if (selected_product_title != '') {
                            product_title = selected_product_title;
                          }else{
                            product_title = prod["title"];
                          }
                        } else if (upsell_setting.upseller_product_title_set_7 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_7;
                        }
                        break;
                      case 7: 
                        if (upsell_setting.upseller_product_title_set_8 == "product") {
                          if (selected_product_title != '') {
                            product_title = selected_product_title;
                          }else{
                            product_title = prod["title"];
                          }
                        } else if (upsell_setting.upseller_product_title_set_8 == "custom") {
                          product_title = upsell_setting.upseller_product_custom_title_8;
                        }
                        break;
                    }

                    return product_title;
                  }
                                    
                  if (vcount == 1 && selected_variant.available == false) {
                    return '';
                  } else if (vcount > 1 && var_in_stock == false && upsell_setting.upsell_type == 'onpage') {
                    return '';
                  } else {
                    var product_image_container = '<div class="check_image">\
                      <a href="'+window.Shopify.routes.root+'products/'+prod["handle"]+'">\
                        <img src="'+selected_variant_img+'" height="60" width="60" alt="'+prod["title"].replace(/"/g, '').replace(/'/g, '')+'">\
                      </a>\
                    </div>';
                    if (selected_variant_img == null) {
                      product_image_container = "";
                    }
                          var subscriptionAttribute = '';
                          var selling_plan_product_exit = 'launchtip_data-selling-plan-product-exit="false"';
                          if(prod["requires_selling_plan"] !== undefined) {
                            subscriptionAttribute = ' launchtip_data-requires-selling-plan="' + prod["requires_selling_plan"] + '"';
                          }
                          if(prod["selling_plan_groups"] && prod["selling_plan_groups"].length > 0) {
                            selling_plan_product_exit = 'launchtip_data-selling-plan-product-exit="true"';
                          }
                          if (prod["selling_plan_groups"] && prod["selling_plan_groups"].length > 0 && lead_product_data_plan == false  && lead_product_data_plan_count < 0)
                          {return '';}
                          if (prod["selling_plan_groups"] && prod["selling_plan_groups"].length == 0 && lead_product_data_plan == true  && lead_product_data_plan_count > 0)
                          {return '';}

                            return '<li class="'+convertToSlug(upsell_setting.upseller_name)+' checkproductbox '+ class_data_variable_variant +'" '+subscriptionAttribute+' '+selling_plan_product_exit+'>\
                              <div id="checkbox__'+prod["handle"]+'" class="onpage_item">\
                                '+ product_image_container +'\
                                <div class="check_details">\
                                  <div class="provariantdata" style="display:none;">'+JSON.stringify(prod)+'</div>\
                                  <p class="title" style="'+title_font_css+'">\
                                    <a href=" '+window.Shopify.routes.root+'products/'+prod["handle"]+'" title="'+title_get(count)+'" style="'+titlestyletoapply+'">'+title_get(count)+'</a>\
                                  </p>\
                                  <div>\
                                    <div class="thumbnail-wrapper">\
                                      '+vselectlist+'\
                                    </div>\
                                  </div>\
                                </div>\
                                '+price_get(count)+'\
                                <div class="check_action">\
                                  <div class="sellup_checkbox">\
                                    '+finalhtml_button+'\
                                  </div>\
                                </div>\
                              </div>\
                            </li>';
                  }
                }
              }
              ///////////////////////////////////////////////////////////////////////////////////
              var class_data_variable_variant
              function get_product(upsell_data, sellup_id,each_variant_class_data){
                var finalhtml='',cfinalhtml='',morefinalhtml='',morecfinalhtml='',product_list='',cproduct_list='';
                // var rem_more_product_list='',rem_more_cproduct_list='';
                // var s_product_list="",s_cproduct_list="",s_more_product_list="",s_more_cproduct_list="";
                // console.log(upsell_data);
                class_data_variable_variant = each_variant_class_data ? each_variant_class_data : "launchtip_onpage_each_product_offer";
                if (upsell_data.length > 0) {

                  function regroupByCategory(jsonArray) {
                    return jsonArray.reduce((grouped, item) => {
                      if (setting.title_status == true) {
                        if (!grouped[item.offer_title_text]) {
                          grouped[item.offer_title_text] = [];
                        }
                        grouped[item.offer_title_text].push(item);
                        return grouped;
                      }else{
                        if (!grouped[""]) {
                          grouped[""] = [];
                        }
                        grouped[""].push(item);
                        return grouped;
                      }
                    }, {});
                  }

                  var upsell_data_grouped = regroupByCategory(upsell_data);

                  // var upsell_data_grouped = Object.groupBy(upsell_data, on_up => {
                  //   if (setting.title_status == true) {
                  //     return on_up.offer_title_text
                  //   }else{
                  //     return ""
                  //   }
                  //   // return (on_up.offer_title_text == '' || on_up.offer_title_status == true) ? on_up.offer_title_text : "has_title"
                  // });
                }
                var key_variant = 0;
                var toggler_html = '',ctoggler_html = '',stack_onpage_title="";
                $.each(upsell_data_grouped, function(key1, value1) {
                  if(value1.length == 1 && key1 != ""){
                    // console.log("value1 if")
                    // console.log(key1)
                    // console.log(value1)

                    if (compact_mode_offers_data["compact_mode"] == 'disabled'){
                      var toggler_html_css = 'display: none;';
                      var morefinalhtml_css = '';
                    }else{
                      var toggler_html_css = '';
                      var morefinalhtml_css = 'display: none;';
                    }

                    if (value1.length > 0) {

                      key_variant =key_variant+1;
                      $.each(value1, function(key, value) {
                        var more_product_list='',more_cproduct_list='';
                        var f_size = setting.title_font_size != '' ? setting.title_font_size + 'px;' : '20px;'

                        if(setting.title_status == false){
                          var section_offer_title = '';
                        }else{
                          if (value.offer_title_status == false){
                            if (value.offer_customize_status && value.offer_title_text != "") {
                              var section_offer_title = '<div class="dynamic_title_upsell_section test1 '+ class_data_variable_variant +' " style="font-size:' + f_size + 'font-weight: 600;"><span>' + value.offer_title_text + '</span></div>';
                            } else {
                              var section_offer_title = '<div class="dynamic_title_upsell_section" style="font-size:' + f_size + 'font-weight: 600;"><span>' + setting.title_text + '</span></div>';
                            }
                          }else{
                            var section_offer_title = '';
                          }
                        }

                        if (value.upseller_upsell_product.length > 0) {
                          if (value.onpage_offer_type == 'checkbox' || value.onpage_offer_type == 'toggle' ) {
                            cproduct_list += section_offer_title;

                            $.each(value.upseller_upsell_product, function(k, v) {
                              if (v.handle != '') {
                                var firstproduct = producthtml_onpage_checkbox(v.id, value.id, v.handle, k, value, v.v_id, key,value.onpage_offer_type)
                                if (k>2) {
                                  more_cproduct_list += firstproduct;
                                }else{
                                  cproduct_list += firstproduct;
                                }
                              }
                            })

                            var ctoggler_html = '';
                            var cmorehtml = '<div class="more_onpage_offers onpage_offer_wrapper_'+value.id+'"" style="'+morefinalhtml_css+'">'+more_cproduct_list+'</div>'
                            if (compact_mode_offers_data["compact_mode"] == 'enabled' && more_cproduct_list != ''){
                              ctoggler_html = '<div class="onpage_new_offer_toggler" style="text-align: right;'+toggler_html_css+'"><span style="cursor: pointer;">'+compact_mode_offers_data["offers_expend_text"]+'</span>&nbsp;<i class="downArrow"></i></div>';
                            }

                            cproduct_list += cmorehtml+ctoggler_html;
                          }else{
                            product_list += section_offer_title;

                            $.each(value.upseller_upsell_product, function(k, v) {
                              if (v.handle != '') {
                                var firstproduct = producthtml(v.id, value.id, v.handle, k, value, v.v_id, key_variant)
                                if (k>2) {
                                  more_product_list += firstproduct;
                                }else{
                                  product_list += firstproduct;
                                }
                              }                          
                            })

                            var toggler_html = '';
                            var morehtml = '<div class="more_onpage_offers onpage_offer_wrapper_'+value.id+'"" style="'+morefinalhtml_css+'">'+more_product_list+'</div>'
                            if (compact_mode_offers_data["compact_mode"] == 'enabled' && more_product_list != ''){
                              toggler_html = '<div class="onpage_new_offer_toggler" style="text-align: right;'+toggler_html_css+'"><span style="cursor: pointer;">'+compact_mode_offers_data["offers_expend_text"]+'</span>&nbsp;<i class="downArrow"></i></div>';
                            }

                            product_list += morehtml+toggler_html;
                          }
                        }
                      });
                    }
                  }else{

                    // console.log("value1 else")
                    // console.log(key1)
                    // console.log(value1)

                    if (value1.length > 0) {
                      var f_size = setting.title_font_size != '' ? setting.title_font_size + 'px;' : '20px;'

                      if(setting.title_status == false){
                        stack_onpage_title = '';
                      }else{
                        if (key1 != "") {
                          stack_onpage_title = '<div class="dynamic_title_upsell_section test" style="font-size:' + f_size + 'font-weight: 600;"><span>' + key1 + '</span></div>';
                        }else if(key1 == ""){
                          if (launchtip_frequent_bounght == "false"|| $('.dynamic_title_upsell_section.test').length === 0){
                           stack_onpage_title = '<div class="dynamic_title_upsell_section test" style="font-size:' + f_size + 'font-weight: 600;"><span>' + setting.title_text + '</span></div>';
                           launchtip_frequent_bounght = "true";
                          }
                        }

                        // if (value1.offer_title_status == false){
                        //   else{
                        //     stack_onpage_title = '<div class="dynamic_title_upsell_section test" style="font-size:' + f_size + 'font-weight: 600;"><span>' + setting.title_text + '</span></div>';
                        //   }
                        // }else{
                        //   var stack_onpage_title = '';
                        // }
                      }

                      var rem_more_product_list='',rem_more_cproduct_list='';
                      var s_product_list='',s_cproduct_list='';

                      $.each(value1, function(key, value) {
                        if (value.upseller_upsell_product.length > 0) {
                          if (value.onpage_offer_type == 'checkbox' || value.onpage_offer_type == 'toggle' ) {

                            $.each(value.upseller_upsell_product, function(k, v) {
                              if (v.handle != '') {
                                var firstproduct = producthtml_onpage_checkbox(v.id, value.id, v.handle, k, value, v.v_id, key,value.onpage_offer_type)
                                if (k>2) {
                                  rem_more_cproduct_list += firstproduct;
                                }else{
                                  s_cproduct_list += firstproduct;
                                }
                              }
                            })

                          }else{

                            $.each(value.upseller_upsell_product, function(k, v) {
                              if (v.handle != '') {
                                var firstproduct = producthtml(v.id, value.id, v.handle, k, value, v.v_id, key)
                                if (k>2) {
                                  rem_more_product_list += firstproduct;
                                }else{
                                  s_product_list += firstproduct;
                                }
                              }
                            })

                          }
                        }
                      });

                      if (compact_mode_offers_data["compact_mode"] == 'disabled'){
                        var toggler_html_css = 'display: none;';
                        var morefinalhtml_css = '';
                      }else{
                        var toggler_html_css = '';
                        var morefinalhtml_css = 'display: none;';
                      }

                      var toggler_html="",ctoggler_html="";
                      if (compact_mode_offers_data["compact_mode"] == 'enabled' && rem_more_product_list != ''){
                        toggler_html = '<div class="onpage_new_offer_toggler" style="text-align: right;'+toggler_html_css+'"><span style="cursor: pointer;">'+compact_mode_offers_data["offers_expend_text"]+'</span>&nbsp;<i class="downArrow"></i></div>';
                      }
                      
                      if (compact_mode_offers_data["compact_mode"] == 'enabled' && rem_more_cproduct_list != ''){
                        ctoggler_html = '<div class="onpage_new_offer_toggler" style="text-align: right;'+toggler_html_css+'"><span style="cursor: pointer;">'+compact_mode_offers_data["offers_expend_text"]+'</span>&nbsp;<i class="downArrow"></i></div>';
                      }

                      var morehtml = '<div class="more_onpage_offers test" style="'+morefinalhtml_css+'">'+rem_more_product_list+'</div>'+toggler_html;
                      var morechtml = '<div class="more_onpage_offers test" style="'+morefinalhtml_css+'">'+rem_more_cproduct_list+'</div>'+ctoggler_html;
                      
                      if (s_cproduct_list != "") {
                        cproduct_list += "<div class='" + class_data_variable_variant + "'>"+stack_onpage_title+s_cproduct_list+morechtml+"</div>"
                      }
                      if (s_product_list != "") {
                        product_list += "<div class='" + class_data_variable_variant + "'>"+stack_onpage_title+s_product_list+morehtml+"</div>"
                      }
                    }
                  }
                });

                finalhtml += product_list;
                cfinalhtml += cproduct_list;

                var wrapperstyletoapply = '';
                if (setting.up_margin_top != '') {
                  wrapperstyletoapply += 'margin-top:' + setting.up_margin_top + 'px;'
                }
                if (setting.up_margin_bottom != '') {
                  wrapperstyletoapply += 'margin-bottom:' + setting.up_margin_bottom + 'px;';
                }

                if (setting.up_title_price_select_font != '' && setting.up_title_price_select_font != 'default' && setting.up_title_price_select_font != 'Default') {
                  var font = setting.up_title_price_select_font.replace(/\+/g, ' ');
                  font = font.split(':');
                  addGoogleFont(font[0]);
                }

                if (cfinalhtml != '') {
                  if ($("#launchtip_upsell_select_wrapper").length) {

                    $('head').append('<style type="text/css">#launchtip_upsell_select_wrapper{' + wrapperstyletoapply + '}</style>');

                    if ($("#launchtip_upsell_select_wrapper ul").length) {
                      $("#launchtip_upsell_select_wrapper ul").append(cfinalhtml);
                    }else{
                      $("#launchtip_upsell_select_wrapper").append('<ul>'+cfinalhtml+'</ul>');
                    }

                  } else {
                    var sellup_id = sellup_id;
                    const substrings = [141, 568, 714, 732, 863, 868, 887, 1356, 1363, 1368, 1431, 1434, 1499, 1500, 1567, 1657, 1841, 1864, 1891];

                    if (substrings.includes(theme_id)){
                      if(setting.up_position == "aboveproduct"){
                        $("form[action*='/cart/add'][data-type='add-to-cart-form'], form[action*='/cart/add']:last").before('<div id="launchtip_upsell_select_wrapper" class="luwc_class" style="' + wrapperstyletoapply + '"><input type="hidden" value="' + sellup_id + '" class="upsell_onpage_sellup_id" ></input><ul>'+ cfinalhtml + '</ul></div>');
                      }else{
                        $("form[action*='/cart/add'][data-type='add-to-cart-form'], form[action*='/cart/add']:last").after('<div id="launchtip_upsell_select_wrapper" class="luwc_class" style="' + wrapperstyletoapply + '"><input type="hidden" value="' + sellup_id + '" class="upsell_onpage_sellup_id" ></input><ul>'+ cfinalhtml + '</ul></div>');
                      }
                    }else{
                      if(setting.up_position == "aboveproduct"){
                        $("form[action*='/cart/add'][data-type='add-to-cart-form'], form[action*='/cart/add']:first,form[action*='/cart/add'] div.product-buy-buttons--smart,form[action*='/cart/add'] button.product-buy-buttons--primary").before('<div id="launchtip_upsell_select_wrapper" class="luwc_class" style="' + wrapperstyletoapply + '"><input type="hidden" value="' + sellup_id + '" class="upsell_onpage_sellup_id" ></input><ul>'+ cfinalhtml + '</ul></div>');
                      }else{
                        $("form[action*='/cart/add'][data-type='add-to-cart-form'], form[action*='/cart/add']:first,form[action*='/cart/add'] div.product-buy-buttons--smart,form[action*='/cart/add'] button.product-buy-buttons--primary").after('<div id="launchtip_upsell_select_wrapper" class="luwc_class" style="' + wrapperstyletoapply + '"><input type="hidden" value="' + sellup_id + '" class="upsell_onpage_sellup_id" ></input><ul>'+ cfinalhtml + '</ul></div>');
                      }
                    }
                  }
                }
                if (finalhtml != '') {
                  var popuphtml = '<div class="launchtip_upsell_lightbox" id="fl1">This div will be opened in a lightbox</div>'

                  //ahoy.trackView();
                  if (setting.enable_ajax == true) {
                  }

                  if ($("#launchtip_upsell_wrapper").length) {

                    $('head').append('<style type="text/css">#launchtip_upsell_wrapper{' + wrapperstyletoapply + '}</style>');

                    $("#launchtip_upsell_wrapper").append(finalhtml);

                  } else {
                    var sellup_id = sellup_id;
                    const substrings = [141, 568, 714, 732, 863, 868, 887, 1356, 1363, 1368, 1431, 1434, 1499, 1500, 1567, 1657, 1841, 1864, 1891];

                    if (substrings.includes(theme_id)){
                      if(setting.up_position == "aboveproduct"){
                        $("form[action*='/cart/add'][data-type='add-to-cart-form'], form[action*='/cart/add']:last").before('<div id="launchtip_upsell_wrapper" class="luwb_class" style="'+wrapperstyletoapply+'"><input type="hidden" value="'+sellup_id+'" class="upsell_onpage_sellup_id" ></input>'+finalhtml+'</div>');
                      }
                      else{
                        $("form[action*='/cart/add'][data-type='add-to-cart-form'], form[action*='/cart/add']:last").after('<div id="launchtip_upsell_wrapper" class="luwb_class" style="'+wrapperstyletoapply+'"><input type="hidden" value="'+sellup_id+'" class="upsell_onpage_sellup_id" ></input>'+finalhtml+'</div>');
                      }
                    }else{
                      if(setting.up_position == "aboveproduct"){
                        $("form[action*='/cart/add'][data-type='add-to-cart-form'], form[action*='/cart/add']:first,form[action*='/cart/add'] div.product-buy-buttons--smart,form[action*='/cart/add'] button.product-buy-buttons--primary").before('<div id="launchtip_upsell_wrapper" class="luwb_class" style="'+wrapperstyletoapply+'"><input type="hidden" value="'+sellup_id+'" class="upsell_onpage_sellup_id" ></input>'+finalhtml+'</div>');
                      }
                      else{
                        $("form[action*='/cart/add'][data-type='add-to-cart-form'], form[action*='/cart/add']:first,form[action*='/cart/add'] div.product-buy-buttons--smart,form[action*='/cart/add'] button.product-buy-buttons--primary").after('<div id="launchtip_upsell_wrapper" class="luwb_class" style="'+wrapperstyletoapply+'"><input type="hidden" value="'+sellup_id+'" class="upsell_onpage_sellup_id" ></input>'+finalhtml+'</div>');
                      }
                    }
                  }
                }

                // hide other wrappers instead on one if multiple create
                var bouw = $(".luwb_class");
                bouw.slice(1).hide();

                var couw = $(".luwc_class");
                couw.slice(1).hide();
              } // get_product

              function get_action_product(upsell_data, sellup_id) {
                var finalhtml = '';
                var product_list = [];
                upsell_action_data = upsell_data;
                upsell_action_data = upsell_data.filter((item, index, self) =>
                  index === self.findIndex(t => t.id === item.id)
                );
                // console.log(product_list);
                if (upsell_action_data.length > 0) {
                  $.each(upsell_action_data, function(key, value) {

                    if (value.upseller_upsell_product.length > 0) {
                      $.each(value.upseller_upsell_product, function(k, v) {

                        if (v.handle != '') {
                          var firstproduct = producthtml(v.id, value.id, v.handle, k, value, v.v_id, key,"action_offer")
                          if (firstproduct != '')
                            product_list[key] += firstproduct;

                          //product_list += firstproduct;
                        }
                      })
                    }
                  });
                }

                var wrapperstyletoapply = '';
                if (setting.up_margin_top != '') {
                  wrapperstyletoapply += 'margin-top:' + setting.up_margin_top + 'px;'
                }
                if (setting.up_margin_bottom != '') {
                  wrapperstyletoapply += 'margin-bottom:' + setting.up_margin_bottom + 'px;';
                }

                product_list = product_list.filter(item => item)

                if (product_list != '') {
                  //ahoy.trackView();
                  if (setting.enable_ajax == true) {

                  }
                  if (setting.up_title_price_select_font != '' && setting.up_title_price_select_font != 'default' && setting.up_title_price_select_font != 'Default') {
                    var font = setting.up_title_price_select_font.replace(/\+/g, ' ');
                    font = font.split(':');
                    addGoogleFont(font[0]);
                  }

                  var popuphtml = '<div class="launchtip_upsell_lightbox" id="fl1">This div will be opened in a lightbox</div>'
                  if (setting.title_status == true) {
                    var f_size = setting.title_font_size != '' ? setting.title_font_size + 'px;' : '20px;'
                    var title_html_sellup = '<div class="dynamic_title_upsell" style="font-size:' + f_size + '"><span>' + setting.title_text + '</span></div>';
                  } else {
                    var title_html_sellup = '';
                  }

                  //console.log(upsell_action_data);
                  //var action_title = upsell_action_data[0]['action_popup_title'];
                  //var action_desc = upsell_action_data[0]['action_popup_description'];
                  var continue_text = upsell_action_data[upsell_action_data.length - 1]['action_upsell_continue'];
                  var offer_text = setting.action_popup_offer_text;
                  var next_text = setting.action_popup_next_text;

                  // if(action_title != ""){
                  // }else{
                  //     if(upsell_action_data[0]['action_offer_type'] == 'upsell'){
                  //         action_title = 'Fancy an upgrade?';
                  //     }else{
                  //         action_title = 'Fancy a little extra?';
                  //     }
                  // } 
                  // if(action_desc != ""){
                  // }else{
                  //     action_desc = 'Check out these amazing related products...'
                  // } 

                  if (continue_text != "") {

                  } else {
                    continue_text = 'Continue'
                  }
                  if (offer_text != "") {

                  } else {
                    offer_text = 'Offer'
                  }
                  if (next_text != "") {

                  } else {
                    next_text = 'Next'
                  }
                  var sellup_id = sellup_id;
                  $.each(upsell_action_data, function(key, value) {
                    if (value['action_popup_title'] != "") {
                      action_title = value['action_popup_title'];
                    } else {
                      if (value['action_offer_type'] == 'upsell') {
                        action_title = 'Fancy an upgrade?';
                      } else {
                        action_title = 'Fancy a little extra?';
                      }
                    }
                    if (value['action_popup_description'] != "") {
                      action_desc = value['action_popup_description'];
                    } else {
                      if (value['action_offer_type'] == 'upsell') {
                        action_desc = 'Check out these alternative products'
                      } else {
                        action_desc = 'Check out these amazing related products'
                      }
                    }

                    if (product_list[key] != undefined){
                      product_list[key] = product_list[key].replace("undefined", "");
                    }

                    offer_number = parseInt(key) + 1;
                    var offer_data = "";
                    var popupfontcolor = setting['popup_font_color'];
                    if (popupfontcolor == '') {
                      popupfontcolor = '#000';
                    }
                    if (upsell_action_data.length > 1) {
                      offer_data = '<span style="color: ' + popupfontcolor + ';font-size: 16px;float: left;">' + offer_text + ' ' + offer_number + '/' + product_list.length + '</span>';
                    } else {
                      offer_data = "";
                    }
                    if (upsell_action_data.length == key + 1 || key == product_list.length-1) {
                      var continue_next = '<a href="#" class="continue-button-action" style="color: ' + popupfontcolor + ';font-size: 18px;float: right;margin-right: 2%;text-decoration: underline;">' + continue_text + '</a>';
                    } else {
                      var continue_next = '<a href="#" class="next-button-action" data-key="' + key + '" style="color: ' + popupfontcolor + ';font-size: 17px;float: right;margin-right: 2%;text-decoration: underline;">' + next_text + '</a></div>'
                    }
                    $("body").append('<div class="actionOfferPopup_' + key + ' upsellmyPopup action-upsell-popup text-left"><input type="hidden" value="' + sellup_id + '" class="upsell_action_sellup_id" ></input><div class="actionpopup_text"><h3>' + action_title + '</h3></div><div class="actionpopup_desc" style="padding-top: 1%;font-size: 18px;"><span>' + action_desc + '</span></div>' + product_list[key] + offer_data + continue_next);
                  });

                }else{
                  is_action_offers_available = false;
                }
              } // get_action_product


              // var upsell_data = $.grep(upsellers, function (element, index) {
              //   return element.upseller_lead_prod_id == product_id;
              // });

              var upsell_data = upsellers.filter(item => 
                item.upseller_lead_products.some(ulp => ulp.id === String(product_id))
              );

              // var upsell_action_data = $.grep(upsellers_action, function (element, index) {
              //   return element.upseller_lead_prod_id == product_id;
              // });

              var upsell_action_data = upsellers_action.filter(item => 
                item.upseller_lead_products.some(ulp => ulp.id === String(product_id))
              );

              var configuration = ({
                afterOpen: function(event){
                  $(document).find('.featherlight').find('.launchtip_select_option_list').trigger('click');
                },
                beforeOpen: function(event){
                  var variant_popup_bg_color = (setting['popup_bg_color'] == '' || setting['popup_bg_color'] == null) ? '#fff' : setting['popup_bg_color'];
                  $('.launchtip_upsell_lightbox h3').attr("style", "color: "+setting['popup_font_color']+";");
                  $('button.featherlight-close').attr("style", "background-color: transparent !important; color: "+setting['popup_button_color']+";");
                  $('.launchtip_upsell_lightbox select, .launchtip_upsell_lightbox input').attr("style", "background-color: "+setting['popup_bg_color']+" !important; color: "+setting['popup_font_color']+";");
                  $('.featherlight-content').attr("style", "background-color: "+variant_popup_bg_color+" !important; border-color: "+setting['popup_border_color']+" !important; color: "+setting['popup_font_color']+";");
                  $('.launchtip_upsell_lightbox select.launchtip_select_wrapper').hide();
                }
              });

              function handleproductOpenBox(e) {
                e.preventDefault();
                var this_id = $(this).attr('href');
                  if( template_name == 'product'){
                    $.featherlight(this_id, configuration);
                  }
              }

              document.addEventListener('click', function(e) {
                if (e.target.closest('.openbox')) {
                  handleproductOpenBox.call(e.target.closest('.openbox'), e);
                }
              }, true);

              
              $(document).ready(function() {

                if (upsell_action_data != "" && upsellers_action[0]['redirect_add_cart'] == true) {
                  $('.action-upsell-add-cart').addClass('uniq_store_con');
                  var formData = $(this).closest('form').serialize();
                  $('form[action^="/cart/add"]').on('submit', function(evt) {

                    $.ajax({
                      type: 'POST',
                      url: '/cart/add.js',
                      data: formData,
                      dataType: 'json',
                      success: function() {
                        //window.location.href = '/cart'; 
                      }
                    });
                    evt.preventDefault();
                    //return false;
                    //add custom cart code here
                  });
                } else {

                }

                function check_and_close_popup(self) {
                  var idcheck = $(self).siblings("div").attr('id');

                  if (upsell_action_data != "" && upsellers_action[0]['redirect_add_cart'] == true) {
                    if (cartredirection_whenupsellupgrade == true) {
                      window.location.href = '/cart';
                    } else if (idcheck == undefined) {
                      if(shop_name == "iocani.myshopify.com"){
                        action_flag = true
                      }else{
                        if (global_add_to_cart_btn.hasClass('hulkapps_submit_cart')) {
                          global_add_to_cart_btn.parents('form:first').submit();
                        }else if(shop_name != "akt-london.myshopify.com"){
                        global_add_to_cart_btn.click();
                        }
                      }
                    }
                    setTimeout(function() {
                      window.location.href = "/cart";
                    }, 1000);
                  } else {
                    if (cartredirection_whenupsellupgrade == true) {
                      window.location.href = '/cart';
                    } else if (idcheck == undefined) {
                      if(shop_name == "iocani.myshopify.com"){
                        action_flag = true
                      }else{
                        if (global_add_to_cart_btn.hasClass('hulkapps_submit_cart')) {
                          global_add_to_cart_btn.parents('form:first').submit();
                        }else if(shop_name != "akt-london.myshopify.com"){
                        global_add_to_cart_btn.click();
                        }
                      }
                    }
                  }
                }

                $(document).on("click",".continue-button-action",function(e) {
                  $(".featherlight-close").trigger('click');
                });

                $(document).on("click",".featherlight-close",function(e, str) {
                  carosal_add_to_cart = "false";
                  if (str != 'switchoffer'){
                    check_and_close_popup(this);
                  }
                });

                $(document).on("click", ".next-button-action", function(e) {
                  $('div.featherlight').css({
                    'background': 'rgba(0,0,0,.8)'
                  });
                  //e.preventDefault();
                  var key = $(this).attr("data-key");
                  key = parseInt(key) + 1;

                  $(".featherlight-close").trigger('click','switchoffer');
                  $.featherlight('.actionOfferPopup_' + key + '');

                  setTimeout(function() {
                    $('.featherlight-content').attr("style", "background-color: " + setting['popup_bg_color'] + " !important; border-color: " + setting['popup_border_color'] + " !important; color: " + setting['popup_font_color'] + ";");
                    $('button.featherlight-close').attr("style", "background-color: transparent !important; color: " + setting['popup_button_color'] + ";");
                  }, 100);
                });

                
                $('.action_add_to_cart').click(function() {
                  var url = base_url + '/output/view.json?shop=' + shop_name + '&product_id=' + product_id + '&upsell_type=action';
                  var div_exists_or_not = $("div.actionOfferPopup_0").length;

                  if (upsell_action_data != "" && div_exists_or_not == 1) {
                    $.ajax({
                      crossOrigin: true,
                      url: url,
                      success: function(data) {
                        var sellup_id = data["sellup_id"];
                        var token1 = generateToken();
                        if (sellup_id.length != 0) {
                          $.each(sellup_id, function(index, value) {
                            if (value != "") {
                              var sub_url = 'https://analytics-sellup.herokuapp.com';
                              var url_ind_pr = base_url + '/output/individual_detail.json?sellup_id=' + value;
                              $.ajax({
                                crossOrigin: true,
                                url: url_ind_pr,
                                success: function(data) {
                                  $.post(sub_url + '/upsell_views', {
                                    shop: shop_name,
                                    visit_token: token1,
                                    visitor_token: token1,
                                    event_type: "$view",
                                    sellup_id: value,
                                    ind_upsell_data: data["ind_upsell_data"],
                                    time: Math.round(+new Date() / 1000)
                                  }).always(function() {});
                                }
                              })
                            } else {

                            }
                          })
                        }
                      }
                    })

                    $.featherlight('.actionOfferPopup_0');
                    $('.featherlight-content').attr("style", "background-color: " + setting['popup_bg_color'] + " !important; border-color: " + setting['popup_border_color'] + " !important; color: " + setting['popup_font_color'] + ";");
                    $('.upsellmyPopup .actionpopup_text h3').attr("style", "color: " + setting['popup_font_color'] + ";");
                    $('button.featherlight-close').attr("style", "background-color: transparent !important; color: " + setting['popup_button_color'] + ";");
                  }
                });

                $('#sellup-product-add-to-cart').click(function() {
                  var url = base_url + '/output/view.json?shop=' + shop_name + '&product_id=' + product_id + '&upsell_type=action';
                  var div_exists_or_not = $("div.actionOfferPopup_0").length;

                  if (upsell_action_data != "" && div_exists_or_not == 1) {
                    $.ajax({
                      crossOrigin: true,
                      url: url,
                      success: function(data) {
                        var sellup_id = data["sellup_id"];
                        var token1 = generateToken();
                        if (sellup_id.length != 0) {
                          $.each(sellup_id, function(index, value) {
                            if (value != "") {
                              var sub_url = 'https://analytics-sellup.herokuapp.com';
                              var url_ind_pr = base_url + '/output/individual_detail.json?sellup_id=' + value;
                              $.ajax({
                                crossOrigin: true,
                                url: url_ind_pr,
                                success: function(data) {
                                  $.post(sub_url + '/upsell_views', {
                                    shop: shop_name,
                                    visit_token: token1,
                                    visitor_token: token1,
                                    event_type: "$view",
                                    sellup_id: value,
                                    ind_upsell_data: data["ind_upsell_data"],
                                    time: Math.round(+new Date() / 1000)
                                  }).always(function() {});
                                }
                              })
                            } else {

                            }
                          })
                        }
                      }
                    })

                    $.featherlight('.actionOfferPopup_0');
                    $('.featherlight-content').attr("style", "background-color: " + setting['popup_bg_color'] + " !important; border-color: " + setting['popup_border_color'] + " !important; color: " + setting['popup_font_color'] + ";");
                    $('.upsellmyPopup .actionpopup_text h3').attr("style", "color: " + setting['popup_font_color'] + ";");
                    $('button.featherlight-close').attr("style", "background-color: transparent !important; color: " + setting['popup_button_color'] + ";");
                  }
                });

                action_flag = true;
                var $addToCartButton;
                // grid and erus theme
                  window.$originalAddToCartButton = $('form[action*="/cart/add"][data-type="add-to-cart-form"] button[type=submit]:not(".launchtip_add_to_cart"), form[action*="/cart/add"] button[type=submit]:not(".launchtip_add_to_cart"):first, form[action*="/cart/add"] input[type=submit]:not(".launchtip_add_to_cart"):first, form[action*="/cart/add"] a:contains("Add to Cart"),button.product-buy-buttons--primary');
                  $addToCartButton = window.$originalAddToCartButton;
                
                function action_offerAddToCartHandler(evt) {
                  var action_add_to_cart_btn = evt.target.closest(
                  'form[action*="/cart/add"][data-type="add-to-cart-form"] button[type=submit]:not(.launchtip_add_to_cart), ' +
                  'form[action*="/cart/add"] button[type=submit]:not(.launchtip_add_to_cart), ' +
                  'form[action*="/cart/add"] input[type=submit]:not(.launchtip_add_to_cart), ' +
                  'button.product-buy-buttons--primary, ' +
                  'form[action*="/cart/add"] a'
                  );
                  if (!action_add_to_cart_btn) return;

                  global_add_to_cart_btn = $(action_add_to_cart_btn);
                  const shouldShowActionPopup = (lead_product_data_plan_count !== 0) && check_action_offer_products_present();
                  if (shouldShowActionPopup) {
                    action_flag = true;
                    run_checkboxes_add_to_cart(evt, "no_action_off");
                    return;
                  }
                  
                  if(action_flag==true && is_action_offers_available){
                    if (upsell_action_data != '') {
                      evt.preventDefault();
                      evt.stopPropagation();
                
                      run_checkboxes_add_to_cart(evt);
                      run_add_to_cart(evt);
                      action_flag=false;
                    }else{
                      run_checkboxes_add_to_cart(evt);
                    }
                  }else{
                    action_flag=true;
                    run_checkboxes_add_to_cart(evt, "no_action_off");
                  }

                }

                document.addEventListener("click", action_offerAddToCartHandler, true);

                function run_checkboxes_add_to_cart(evt, act){
                  var no_of_checks = $('#launchtip_upsell_select_wrapper input[type=checkbox]:checked').length;
                  if (no_of_checks > 0) {

                    evt.preventDefault();
                    evt.stopPropagation();

                    var items = [];
                    var items1 = [];
                    // if (upsell_action_data == '') {
                    //  $('form[action^="/cart/add"]:last button[type=submit]').prop('disabled', true);
                    // }
                    $('#launchtip_upsell_select_wrapper input[type=checkbox]:checked').each(function(index) {
                      var form = $(this).parents('.onpage_item');
                      // var form_id = form.attr('id');
                      // var form_data = $('#'+form_id+' :input').serialize();

                      var id = $(form).find("select.launchtip_check_select_wrapper").val();
                      var quantity = $(form).find("input[name='quantity']").val();
                      var individual_product_id = $(this).attr('ind_product_id');
                      var m_price = $(form).find('.main_price').val();
                      var token1 = generateToken();
                      var sellup_id = $(this).attr('sell-id');
                        if (product_selling_plan_value != undefined) {
                         var purchaseOption = product_selling_plan_value
                          if (purchaseOption === 'one_time_purchase') {
                           selling_plan_id = '';
                          }
                           else{
                             selling_plan_id = $(form).find("input[name='selling_plan']").val();
                          }
                        }
                        if (lead_product_data_plan == true && lead_product_data_plan_count != 0) {
                          selling_plan_id = $(form).find("input[name='selling_plan']").val();
                        }

                      if (setting.parent_attribution == true) {
                        var pro = {
                          id: id,
                          quantity: quantity,
                          selling_plan:selling_plan_id,
                          properties: {
                            'Added': mainproduct_title
                          }
                        }
                      }else{
                        var pro = {
                          id: id,
                          quantity: quantity,
                          selling_plan:selling_plan_id,
                        }
                      }

                      var pro1 = {
                        id: id,
                        quantity: quantity,
                        individual_product_id: individual_product_id,
                        m_price: m_price,
                        token1: token1,
                        sellup_id: sellup_id,
                        selling_plan:selling_plan_id
                      }

                      items.push(pro)
                      items1.push(pro1)
                    });
                    // console.log(items)

                    fetch(window.Shopify.routes.root + 'cart/add.js', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({items})
                    })
                    .then(response => {
                      console.error('Response:', response);
                      $.each( items1, function( key, value ) {
                        var sub_url = 'https://analytics-sellup.herokuapp.com'; 
                        if(value.sellup_id != ""){
                          $.post( sub_url+'/upsell_views',{ shop: shop_name,individual_product_id: value.individual_product_id, sellup_id: value.sellup_id, visit_token: value.token1, event_type: "$click",main_price: value.m_price, visitor_token: value.token1,product_id: product_id, time: Math.round(+new Date()/1000) }).always(function() {
                        
                          });
                        }else{

                        }
                      });

                      $('#launchtip_upsell_select_wrapper input:checked').prop('checked', false);

                      if (upsell_action_data == '') {
                        action_flag=false;
                        global_add_to_cart_btn.click();
                      }else if(act == "no_action_off"){
                        action_flag=true;
                        global_add_to_cart_btn.click();
                      }
                      // else if(upsell_action_data != '' && is_action_offers_available == false){
                      //   action_flag=true;
                      //   global_add_to_cart_btn.click();
                      // }
                      return response.json();
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });

                  }else if(upsell_action_data == ''){
                    action_flag=false;
                    // global_add_to_cart_btn.click();
                  }
                }

                function run_add_to_cart(evt) {
                  var url = base_url + '/output/view.json?shop=' + shop_name + '&product_id=' + product_id + '&upsell_type=action';
                  var div_exists_or_not = $("div.actionOfferPopup_0").length;

                  if (upsell_action_data != "" && div_exists_or_not == 1) {
                    $.ajax({
                      crossOrigin: true,
                      url: url,
                      success: function(data) {
                        var sellup_id = data["sellup_id"];
                        var token1 = generateToken();
                        if (sellup_id.length != 0) {
                          $.each(sellup_id, function(index, value) {
                            if (value != "") {
                              var sub_url = 'https://analytics-sellup.herokuapp.com';
                              var url_ind_pr = base_url + '/output/individual_detail.json?sellup_id=' + value;
                              $.ajax({
                                crossOrigin: true,
                                url: url_ind_pr,
                                success: function(data) {
                                  $.post(sub_url + '/upsell_views', {
                                    shop: shop_name,
                                    visit_token: token1,
                                    visitor_token: token1,
                                    event_type: "$view",
                                    sellup_id: value,
                                    ind_upsell_data: data["ind_upsell_data"],
                                    time: Math.round(+new Date() / 1000)
                                  }).always(function() {});
                                }
                              })
                            } else {

                            }
                          })
                        }
                      }
                    })

                    $.featherlight('.actionOfferPopup_0');
                    $('.featherlight-content').attr("style", "background-color: " + setting['popup_bg_color'] + " !important; border-color: " + setting['popup_border_color'] + " !important; color: " + setting['popup_font_color'] + ";");
                    $('.upsellmyPopup .actionpopup_text h3').attr("style", "color: " + setting['popup_font_color'] + ";");
                    $('button.featherlight-close').attr("style", "background-color: transparent !important; color: " + setting['popup_button_color'] + ";");

                    $('.action-upsell-popup a.detail_title, .action-upsell-popup .image a').on('click', function(e){
                      e.preventDefault();
                      var href = $(this).attr('href');

                      //global_add_to_cart_btn.click();
                      $(".featherlight-close").trigger('click');
                      setTimeout(function() {
                        window.location.href = href;
                      }, 1000);
                    });
                  }
                }

                $('.action-upsell-add-cart').click(function(e) {
                  var url = base_url + '/output/view.json?shop=' + shop_name + '&product_id=' + product_id + '&upsell_type=action';
                  var div_exists_or_not = $("div.actionOfferPopup_0").length;

                  if (upsell_action_data != "" && div_exists_or_not == 1) {
                    $.ajax({
                      crossOrigin: true,
                      url: url,
                      success: function(data) {
                        var sellup_id = data["sellup_id"];
                        var token1 = generateToken();
                        if (sellup_id.length != 0) {
                          $.each(sellup_id, function(index, value) {
                            if (value != "") {
                              var sub_url = 'https://analytics-sellup.herokuapp.com';
                              var url_ind_pr = base_url + '/output/individual_detail.json?sellup_id=' + value;
                              $.ajax({
                                crossOrigin: true,
                                url: url_ind_pr,
                                success: function(data) {
                                  $.post(sub_url + '/upsell_views', {
                                    shop: shop_name,
                                    visit_token: token1,
                                    visitor_token: token1,
                                    event_type: "$view",
                                    sellup_id: value,
                                    ind_upsell_data: data["ind_upsell_data"],
                                    time: Math.round(+new Date() / 1000)
                                  }).always(function() {});
                                }
                              })
                            } else {

                            }
                          })
                        }
                      }
                    })
                    e.preventDefault();
                    $('body').removeClass('menuOpen');
                    $('.fullPage').removeClass('witmenu');
                    $('.PageOverlay').removeClass('is-visible');
                    $('body').removeClass('cartOpen');
                    $.featherlight('.actionOfferPopup_0');
                    $('.featherlight-content').attr("style", "background-color: " + setting['popup_bg_color'] + " !important; border-color: " + setting['popup_border_color'] + " !important; color: " + setting['popup_font_color'] + ";");
                    $('.upsellmyPopup .actionpopup_text h3').attr("style", "color: " + setting['popup_font_color'] + ";");
                    $('button.featherlight-close').attr("style", "background-color: transparent !important; color: " + setting['popup_button_color'] + ";");
                  }
                });

              });
            }else{
              // console.log("template is not product")
            }
          } // sellup_shop_data success end
        });

          // function related to  subscription logic
          function check_action_offer_products_present(){
           const productDivsInPopup = $('.actionOfferPopup_0 [id^="product-"]');
            if (productDivsInPopup.length > 0) {
              const allHidden = productDivsInPopup.toArray().every(el => $(el).css('display') === 'none');
              if (allHidden) {
              return true; 
              } else{
              return false; 
              }
            }
          }
           // Function to check if dynamic title upsell section should be hidden
          function dynamic_title_upsell_section_check() {
            $('.dynamic_title_upsell_section').each(function () {
              const section = $(this);
              const products = section.nextUntil('.more_onpage_offers', '[id^="product-"]');
              if (products.length > 0) {
                const allHidden = products.toArray().every(el => $(el).css('display') === 'none');
                if (allHidden) {
                  section.hide();
                } else {
                  section.show(); 
                }
              } else {
                const chekboxsection = section.nextUntil('.more_onpage_offers', '.checkproductbox');
                const allHidden = chekboxsection.toArray().every(el => $(el).css('display') === 'none');
                if (allHidden) {
                  section.hide();
                } else {
                  section.show();
                }
              }
            });
          }
      
          // Get initially selected value shopify subscription app
          function handleSelection(selectedRadio) {
            var radioType = selectedRadio.data('radio-type');
            var value = selectedRadio.val();
            $('[launchtip_data-requires-selling-plan]').each(function() {
              var data_value = $(this).attr('launchtip_data-requires-selling-plan');
              if (radioType === 'one_time_purchase' && data_value == "true") {
                $('[launchtip_data-requires-selling-plan="true"]').hide(); 
                product_selling_plan_value = "one_time_purchase";

              }
              else if (radioType === 'one_time_purchase' && data_value == "false") {
                $('[launchtip_data-requires-selling-plan="false"]').show();
                  product_selling_plan_value = "one_time_purchase";
              }
              else{
                $('[launchtip_data-requires-selling-plan="true"]').show();
                $('[launchtip_data-selling-plan-product-exit="false"]').hide();
                  product_selling_plan_value = "subscription";

              }
            });
            dynamic_title_upsell_section_check();


          }

          // Get initially selected value
            // Detect changes
            // Function to handle Appstle widget selection
          function handleAppstleSelection(selectedRadio) {       
          var value = selectedRadio.val();
            $('[launchtip_data-requires-selling-plan]').each(function() {
              var data_value = $(this).attr('launchtip_data-requires-selling-plan');
              if (value == '' && data_value == "true") {
                $('[launchtip_data-requires-selling-plan="true"]').hide(); 
                product_selling_plan_value = "one_time_purchase";
              }
              else if (value == '' && data_value == "false") {
                $('[launchtip_data-requires-selling-plan="false"]').show();
                product_selling_plan_value = "one_time_purchase";
              }
              else{
                $('[launchtip_data-requires-selling-plan="true"]').show();
                $('[launchtip_data-selling-plan-product-exit="false"]').hide();
                product_selling_plan_value = "subscription";
              }
            });  
            dynamic_title_upsell_section_check(); 
          }
            // Detect Appstle widget changes 
          // Function to handle Loop widget selection
          function handleLoopSelection(selectedOption) {
            var type, sellingPlanId;
              $('[launchtip_data-requires-selling-plan]').each(function() {
                var data_value = $(this).attr('launchtip_data-requires-selling-plan');
                if (selectedOption.attr('data-loop-widget-onetime-purchase-option') !== undefined && data_value == "true") {
                  $('[launchtip_data-requires-selling-plan="true"]').hide(); 
                  product_selling_plan_value = "one_time_purchase";
                }
                else if (selectedOption.attr('data-loop-widget-onetime-purchase-option') !== undefined && data_value == "false") {
                  $('[launchtip_data-requires-selling-plan="false"]').show();
                  product_selling_plan_value = "one_time_purchase";
                }
                else{
                  $('[launchtip_data-requires-selling-plan="true"]').show();
                  $('[launchtip_data-selling-plan-product-exit="false"]').hide();
                  product_selling_plan_value = "subscription";
                  
                }
              });
              dynamic_title_upsell_section_check();
            

          }
          //loop detect chnages
          const observer = new MutationObserver(function(mutations) {
            // Process all mutations together
            let hasRelevantChange = false; 
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    (mutation.target.classList.contains('loop-widget-purchase-option-radio') ||
                    mutation.target.classList.contains('loop-widget-purchase-option'))) {
                    hasRelevantChange = true;
                }
            });
            
            // Only run once per batch of mutations
              if (hasRelevantChange) {
                const initialLoopSelected1 = $('.loop-widget-container .loop-widget-purchase-option-selected');
                handleLoopSelection(initialLoopSelected1, true);
              }
          });

          // Start observing
          observer.observe(document.body, {
            attributes: true,
            attributeOldValue: true,
            subtree: true,
            attributeFilter: ['class']
          });

          function initializeSubscriptionSelections() {
            const checkAndHandle = (selector, handler) => {
                const selected = $(selector);
                selected.length > 0 && handler(selected);
            };

            checkAndHandle('.appstle_sub_widget input[name="selling_plan"]:checked', handleAppstleSelection);
            checkAndHandle('.shopify_subscriptions_app_block input[type="radio"]:checked', handleSelection);
            checkAndHandle('.loop-widget-container .loop-widget-purchase-option-selected', handleLoopSelection);
          }



      /////////CART UPSELL
      });
    //////////////////////////// 
    }
     cartdrawer_upsells = function(){
      jQuery(document).ready(function($) {
        // cart drawer upsell
        if(Shopify.theme.theme_store_id != 718 && Shopify.theme.theme_store_id != 872 && Shopify.theme.theme_store_id != 863 && Shopify.theme.theme_store_id != 1979){  // grid and symestry  mavon code cart drawer not have
          cart_detect_change();
          setTimeout(function() {
           cartdrawer_value();
          }, 200);
          cart_drawer_title_event();
        }
      });
    }

    if(window.jQuery){
      jQueryCode();  
      cartdrawer_upsells();  
    } 
    else{   
      var script = document.createElement('script'); 
      document.head.appendChild(script);  
      script.type = 'text/javascript';
      script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
      script.onload = function(){
          jQueryCode(); 
          cartdrawer_upsells();  
      };
    }

  } else {
      var str = __st.pageurl
      var cart_template = page_url.substring(page_url.lastIndexOf("/") + 1, str.length);
      var allcurrenceis = {"USD":{"symbol":"$","name":"US Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"USD","name_plural":"US dollars"},"CAD":{"symbol":"CA$","name":"Canadian Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"CAD","name_plural":"Canadian dollars"},"EUR":{"symbol":"€","name":"Euro","symbol_native":"€","decimal_digits":2,"rounding":0,"code":"EUR","name_plural":"euros"},"AED":{"symbol":"AED","name":"United Arab Emirates Dirham","symbol_native":"د.إ.‏","decimal_digits":2,"rounding":0,"code":"AED","name_plural":"UAE dirhams"},"AFN":{"symbol":"Af","name":"Afghan Afghani","symbol_native":"؋","decimal_digits":0,"rounding":0,"code":"AFN","name_plural":"Afghan Afghanis"},"ALL":{"symbol":"ALL","name":"Albanian Lek","symbol_native":"Lek","decimal_digits":0,"rounding":0,"code":"ALL","name_plural":"Albanian lekë"},"AMD":{"symbol":"AMD","name":"Armenian Dram","symbol_native":"դր.","decimal_digits":0,"rounding":0,"code":"AMD","name_plural":"Armenian drams"},"ARS":{"symbol":"AR$","name":"Argentine Peso","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"ARS","name_plural":"Argentine pesos"},"AUD":{"symbol":"AU$","name":"Australian Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"AUD","name_plural":"Australian dollars"},"AZN":{"symbol":"man.","name":"Azerbaijani Manat","symbol_native":"ман.","decimal_digits":2,"rounding":0,"code":"AZN","name_plural":"Azerbaijani manats"},"BAM":{"symbol":"KM","name":"Bosnia-Herzegovina Convertible Mark","symbol_native":"KM","decimal_digits":2,"rounding":0,"code":"BAM","name_plural":"Bosnia-Herzegovina convertible marks"},"BDT":{"symbol":"Tk","name":"Bangladeshi Taka","symbol_native":"৳","decimal_digits":2,"rounding":0,"code":"BDT","name_plural":"Bangladeshi takas"},"BGN":{"symbol":"BGN","name":"Bulgarian Lev","symbol_native":"лв.","decimal_digits":2,"rounding":0,"code":"BGN","name_plural":"Bulgarian leva"},"BHD":{"symbol":"BD","name":"Bahraini Dinar","symbol_native":"د.ب.‏","decimal_digits":3,"rounding":0,"code":"BHD","name_plural":"Bahraini dinars"},"BIF":{"symbol":"FBu","name":"Burundian Franc","symbol_native":"FBu","decimal_digits":0,"rounding":0,"code":"BIF","name_plural":"Burundian francs"},"BND":{"symbol":"BN$","name":"Brunei Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"BND","name_plural":"Brunei dollars"},"BOB":{"symbol":"Bs","name":"Bolivian Boliviano","symbol_native":"Bs","decimal_digits":2,"rounding":0,"code":"BOB","name_plural":"Bolivian bolivianos"},"BRL":{"symbol":"R$","name":"Brazilian Real","symbol_native":"R$","decimal_digits":2,"rounding":0,"code":"BRL","name_plural":"Brazilian reals"},"BWP":{"symbol":"BWP","name":"Botswanan Pula","symbol_native":"P","decimal_digits":2,"rounding":0,"code":"BWP","name_plural":"Botswanan pulas"},"BYR":{"symbol":"BYR","name":"Belarusian Ruble","symbol_native":"BYR","decimal_digits":0,"rounding":0,"code":"BYR","name_plural":"Belarusian rubles"},"BZD":{"symbol":"BZ$","name":"Belize Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"BZD","name_plural":"Belize dollars"},"CDF":{"symbol":"CDF","name":"Congolese Franc","symbol_native":"FrCD","decimal_digits":2,"rounding":0,"code":"CDF","name_plural":"Congolese francs"},"CHF":{"symbol":"CHF","name":"Swiss Franc","symbol_native":"CHF","decimal_digits":2,"rounding":0.05,"code":"CHF","name_plural":"Swiss francs"},"CLP":{"symbol":"CL$","name":"Chilean Peso","symbol_native":"$","decimal_digits":0,"rounding":0,"code":"CLP","name_plural":"Chilean pesos"},"CNY":{"symbol":"CN¥","name":"Chinese Yuan","symbol_native":"CN¥","decimal_digits":2,"rounding":0,"code":"CNY","name_plural":"Chinese yuan"},"COP":{"symbol":"CO$","name":"Colombian Peso","symbol_native":"$","decimal_digits":0,"rounding":0,"code":"COP","name_plural":"Colombian pesos"},"CRC":{"symbol":"₡","name":"Costa Rican Colón","symbol_native":"₡","decimal_digits":0,"rounding":0,"code":"CRC","name_plural":"Costa Rican colóns"},"CVE":{"symbol":"CV$","name":"Cape Verdean Escudo","symbol_native":"CV$","decimal_digits":2,"rounding":0,"code":"CVE","name_plural":"Cape Verdean escudos"},"CZK":{"symbol":"Kč","name":"Czech Republic Koruna","symbol_native":"Kč","decimal_digits":2,"rounding":0,"code":"CZK","name_plural":"Czech Republic korunas"},"DJF":{"symbol":"Fdj","name":"Djiboutian Franc","symbol_native":"Fdj","decimal_digits":0,"rounding":0,"code":"DJF","name_plural":"Djiboutian francs"},"DKK":{"symbol":"Dkr","name":"Danish Krone","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"DKK","name_plural":"Danish kroner"},"DOP":{"symbol":"RD$","name":"Dominican Peso","symbol_native":"RD$","decimal_digits":2,"rounding":0,"code":"DOP","name_plural":"Dominican pesos"},"DZD":{"symbol":"DA","name":"Algerian Dinar","symbol_native":"د.ج.‏","decimal_digits":2,"rounding":0,"code":"DZD","name_plural":"Algerian dinars"},"EEK":{"symbol":"Ekr","name":"Estonian Kroon","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"EEK","name_plural":"Estonian kroons"},"EGP":{"symbol":"EGP","name":"Egyptian Pound","symbol_native":"ج.م.‏","decimal_digits":2,"rounding":0,"code":"EGP","name_plural":"Egyptian pounds"},"ERN":{"symbol":"Nfk","name":"Eritrean Nakfa","symbol_native":"Nfk","decimal_digits":2,"rounding":0,"code":"ERN","name_plural":"Eritrean nakfas"},"ETB":{"symbol":"Br","name":"Ethiopian Birr","symbol_native":"Br","decimal_digits":2,"rounding":0,"code":"ETB","name_plural":"Ethiopian birrs"},"GBP":{"symbol":"£","name":"British Pound Sterling","symbol_native":"£","decimal_digits":2,"rounding":0,"code":"GBP","name_plural":"British pounds sterling"},"GEL":{"symbol":"GEL","name":"Georgian Lari","symbol_native":"GEL","decimal_digits":2,"rounding":0,"code":"GEL","name_plural":"Georgian laris"},"GHS":{"symbol":"GH₵","name":"Ghanaian Cedi","symbol_native":"GH₵","decimal_digits":2,"rounding":0,"code":"GHS","name_plural":"Ghanaian cedis"},"GNF":{"symbol":"FG","name":"Guinean Franc","symbol_native":"FG","decimal_digits":0,"rounding":0,"code":"GNF","name_plural":"Guinean francs"},"GTQ":{"symbol":"GTQ","name":"Guatemalan Quetzal","symbol_native":"Q","decimal_digits":2,"rounding":0,"code":"GTQ","name_plural":"Guatemalan quetzals"},"HKD":{"symbol":"HK$","name":"Hong Kong Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"HKD","name_plural":"Hong Kong dollars"},"HNL":{"symbol":"HNL","name":"Honduran Lempira","symbol_native":"L","decimal_digits":2,"rounding":0,"code":"HNL","name_plural":"Honduran lempiras"},"HRK":{"symbol":"kn","name":"Croatian Kuna","symbol_native":"kn","decimal_digits":2,"rounding":0,"code":"HRK","name_plural":"Croatian kunas"},"HUF":{"symbol":"Ft","name":"Hungarian Forint","symbol_native":"Ft","decimal_digits":0,"rounding":0,"code":"HUF","name_plural":"Hungarian forints"},"IDR":{"symbol":"Rp","name":"Indonesian Rupiah","symbol_native":"Rp","decimal_digits":0,"rounding":0,"code":"IDR","name_plural":"Indonesian rupiahs"},"ILS":{"symbol":"₪","name":"Israeli New Sheqel","symbol_native":"₪","decimal_digits":2,"rounding":0,"code":"ILS","name_plural":"Israeli new sheqels"},"INR":{"symbol":"Rs","name":"Indian Rupee","symbol_native":"₹","decimal_digits":2,"rounding":0,"code":"INR","name_plural":"Indian rupees"},"IQD":{"symbol":"IQD","name":"Iraqi Dinar","symbol_native":"د.ع.‏","decimal_digits":0,"rounding":0,"code":"IQD","name_plural":"Iraqi dinars"},"IRR":{"symbol":"IRR","name":"Iranian Rial","symbol_native":"﷼","decimal_digits":0,"rounding":0,"code":"IRR","name_plural":"Iranian rials"},"ISK":{"symbol":"Ikr","name":"Icelandic Króna","symbol_native":"kr","decimal_digits":0,"rounding":0,"code":"ISK","name_plural":"Icelandic krónur"},"JMD":{"symbol":"J$","name":"Jamaican Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"JMD","name_plural":"Jamaican dollars"},"JOD":{"symbol":"JD","name":"Jordanian Dinar","symbol_native":"د.أ.‏","decimal_digits":3,"rounding":0,"code":"JOD","name_plural":"Jordanian dinars"},"JPY":{"symbol":"¥","name":"Japanese Yen","symbol_native":"￥","decimal_digits":0,"rounding":0,"code":"JPY","name_plural":"Japanese yen"},"KES":{"symbol":"Ksh","name":"Kenyan Shilling","symbol_native":"Ksh","decimal_digits":2,"rounding":0,"code":"KES","name_plural":"Kenyan shillings"},"KHR":{"symbol":"KHR","name":"Cambodian Riel","symbol_native":"៛","decimal_digits":2,"rounding":0,"code":"KHR","name_plural":"Cambodian riels"},"KMF":{"symbol":"CF","name":"Comorian Franc","symbol_native":"FC","decimal_digits":0,"rounding":0,"code":"KMF","name_plural":"Comorian francs"},"KRW":{"symbol":"₩","name":"South Korean Won","symbol_native":"₩","decimal_digits":0,"rounding":0,"code":"KRW","name_plural":"South Korean won"},"KWD":{"symbol":"KD","name":"Kuwaiti Dinar","symbol_native":"د.ك.‏","decimal_digits":3,"rounding":0,"code":"KWD","name_plural":"Kuwaiti dinars"},"KZT":{"symbol":"KZT","name":"Kazakhstani Tenge","symbol_native":"тңг.","decimal_digits":2,"rounding":0,"code":"KZT","name_plural":"Kazakhstani tenges"},"LBP":{"symbol":"LB£","name":"Lebanese Pound","symbol_native":"ل.ل.‏","decimal_digits":0,"rounding":0,"code":"LBP","name_plural":"Lebanese pounds"},"LKR":{"symbol":"SLRs","name":"Sri Lankan Rupee","symbol_native":"SL Re","decimal_digits":2,"rounding":0,"code":"LKR","name_plural":"Sri Lankan rupees"},"LTL":{"symbol":"Lt","name":"Lithuanian Litas","symbol_native":"Lt","decimal_digits":2,"rounding":0,"code":"LTL","name_plural":"Lithuanian litai"},"LVL":{"symbol":"Ls","name":"Latvian Lats","symbol_native":"Ls","decimal_digits":2,"rounding":0,"code":"LVL","name_plural":"Latvian lati"},"LYD":{"symbol":"LD","name":"Libyan Dinar","symbol_native":"د.ل.‏","decimal_digits":3,"rounding":0,"code":"LYD","name_plural":"Libyan dinars"},"MAD":{"symbol":"MAD","name":"Moroccan Dirham","symbol_native":"د.م.‏","decimal_digits":2,"rounding":0,"code":"MAD","name_plural":"Moroccan dirhams"},"MDL":{"symbol":"MDL","name":"Moldovan Leu","symbol_native":"MDL","decimal_digits":2,"rounding":0,"code":"MDL","name_plural":"Moldovan lei"},"MGA":{"symbol":"MGA","name":"Malagasy Ariary","symbol_native":"MGA","decimal_digits":0,"rounding":0,"code":"MGA","name_plural":"Malagasy Ariaries"},"MKD":{"symbol":"MKD","name":"Macedonian Denar","symbol_native":"MKD","decimal_digits":2,"rounding":0,"code":"MKD","name_plural":"Macedonian denari"},"MMK":{"symbol":"MMK","name":"Myanma Kyat","symbol_native":"K","decimal_digits":0,"rounding":0,"code":"MMK","name_plural":"Myanma kyats"},"MOP":{"symbol":"MOP$","name":"Macanese Pataca","symbol_native":"MOP$","decimal_digits":2,"rounding":0,"code":"MOP","name_plural":"Macanese patacas"},"MUR":{"symbol":"MURs","name":"Mauritian Rupee","symbol_native":"MURs","decimal_digits":0,"rounding":0,"code":"MUR","name_plural":"Mauritian rupees"},"MXN":{"symbol":"MX$","name":"Mexican Peso","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"MXN","name_plural":"Mexican pesos"},"MYR":{"symbol":"RM","name":"Malaysian Ringgit","symbol_native":"RM","decimal_digits":2,"rounding":0,"code":"MYR","name_plural":"Malaysian ringgits"},"MZN":{"symbol":"MTn","name":"Mozambican Metical","symbol_native":"MTn","decimal_digits":2,"rounding":0,"code":"MZN","name_plural":"Mozambican meticals"},"NAD":{"symbol":"N$","name":"Namibian Dollar","symbol_native":"N$","decimal_digits":2,"rounding":0,"code":"NAD","name_plural":"Namibian dollars"},"NGN":{"symbol":"₦","name":"Nigerian Naira","symbol_native":"₦","decimal_digits":2,"rounding":0,"code":"NGN","name_plural":"Nigerian nairas"},"NIO":{"symbol":"C$","name":"Nicaraguan Córdoba","symbol_native":"C$","decimal_digits":2,"rounding":0,"code":"NIO","name_plural":"Nicaraguan córdobas"},"NOK":{"symbol":"Nkr","name":"Norwegian Krone","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"NOK","name_plural":"Norwegian kroner"},"NPR":{"symbol":"NPRs","name":"Nepalese Rupee","symbol_native":"नेरू","decimal_digits":2,"rounding":0,"code":"NPR","name_plural":"Nepalese rupees"},"NZD":{"symbol":"NZ$","name":"New Zealand Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"NZD","name_plural":"New Zealand dollars"},"OMR":{"symbol":"OMR","name":"Omani Rial","symbol_native":"ر.ع.‏","decimal_digits":3,"rounding":0,"code":"OMR","name_plural":"Omani rials"},"PAB":{"symbol":"B/.","name":"Panamanian Balboa","symbol_native":"B/.","decimal_digits":2,"rounding":0,"code":"PAB","name_plural":"Panamanian balboas"},"PEN":{"symbol":"S/.","name":"Peruvian Nuevo Sol","symbol_native":"S/.","decimal_digits":2,"rounding":0,"code":"PEN","name_plural":"Peruvian nuevos soles"},"PHP":{"symbol":"₱","name":"Philippine Peso","symbol_native":"₱","decimal_digits":2,"rounding":0,"code":"PHP","name_plural":"Philippine pesos"},"PKR":{"symbol":"PKRs","name":"Pakistani Rupee","symbol_native":"₨","decimal_digits":0,"rounding":0,"code":"PKR","name_plural":"Pakistani rupees"},"PLN":{"symbol":"zł","name":"Polish Zloty","symbol_native":"zł","decimal_digits":2,"rounding":0,"code":"PLN","name_plural":"Polish zlotys"},"PYG":{"symbol":"₲","name":"Paraguayan Guarani","symbol_native":"₲","decimal_digits":0,"rounding":0,"code":"PYG","name_plural":"Paraguayan guaranis"},"QAR":{"symbol":"QR","name":"Qatari Rial","symbol_native":"ر.ق.‏","decimal_digits":2,"rounding":0,"code":"QAR","name_plural":"Qatari rials"},"RON":{"symbol":"RON","name":"Romanian Leu","symbol_native":"RON","decimal_digits":2,"rounding":0,"code":"RON","name_plural":"Romanian lei"},"RSD":{"symbol":"din.","name":"Serbian Dinar","symbol_native":"дин.","decimal_digits":0,"rounding":0,"code":"RSD","name_plural":"Serbian dinars"},"RUB":{"symbol":"RUB","name":"Russian Ruble","symbol_native":"руб.","decimal_digits":2,"rounding":0,"code":"RUB","name_plural":"Russian rubles"},"RWF":{"symbol":"RWF","name":"Rwandan Franc","symbol_native":"FR","decimal_digits":0,"rounding":0,"code":"RWF","name_plural":"Rwandan francs"},"SAR":{"symbol":"SR","name":"Saudi Riyal","symbol_native":"ر.س.‏","decimal_digits":2,"rounding":0,"code":"SAR","name_plural":"Saudi riyals"},"SDG":{"symbol":"SDG","name":"Sudanese Pound","symbol_native":"SDG","decimal_digits":2,"rounding":0,"code":"SDG","name_plural":"Sudanese pounds"},"SEK":{"symbol":"Skr","name":"Swedish Krona","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"SEK","name_plural":"Swedish kronor"},"SGD":{"symbol":"S$","name":"Singapore Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"SGD","name_plural":"Singapore dollars"},"SOS":{"symbol":"Ssh","name":"Somali Shilling","symbol_native":"Ssh","decimal_digits":0,"rounding":0,"code":"SOS","name_plural":"Somali shillings"},"SYP":{"symbol":"SY£","name":"Syrian Pound","symbol_native":"ل.س.‏","decimal_digits":0,"rounding":0,"code":"SYP","name_plural":"Syrian pounds"},"THB":{"symbol":"฿","name":"Thai Baht","symbol_native":"฿","decimal_digits":2,"rounding":0,"code":"THB","name_plural":"Thai baht"},"TND":{"symbol":"DT","name":"Tunisian Dinar","symbol_native":"د.ت.‏","decimal_digits":3,"rounding":0,"code":"TND","name_plural":"Tunisian dinars"},"TOP":{"symbol":"T$","name":"Tongan Paʻanga","symbol_native":"T$","decimal_digits":2,"rounding":0,"code":"TOP","name_plural":"Tongan paʻanga"},"TRY":{"symbol":"TL","name":"Turkish Lira","symbol_native":"TL","decimal_digits":2,"rounding":0,"code":"TRY","name_plural":"Turkish Lira"},"TTD":{"symbol":"TT$","name":"Trinidad and Tobago Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"TTD","name_plural":"Trinidad and Tobago dollars"},"TWD":{"symbol":"NT$","name":"New Taiwan Dollar","symbol_native":"NT$","decimal_digits":2,"rounding":0,"code":"TWD","name_plural":"New Taiwan dollars"},"TZS":{"symbol":"TSh","name":"Tanzanian Shilling","symbol_native":"TSh","decimal_digits":0,"rounding":0,"code":"TZS","name_plural":"Tanzanian shillings"},"UAH":{"symbol":"₴","name":"Ukrainian Hryvnia","symbol_native":"₴","decimal_digits":2,"rounding":0,"code":"UAH","name_plural":"Ukrainian hryvnias"},"UGX":{"symbol":"USh","name":"Ugandan Shilling","symbol_native":"USh","decimal_digits":0,"rounding":0,"code":"UGX","name_plural":"Ugandan shillings"},"UYU":{"symbol":"$U","name":"Uruguayan Peso","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"UYU","name_plural":"Uruguayan pesos"},"UZS":{"symbol":"UZS","name":"Uzbekistan Som","symbol_native":"UZS","decimal_digits":0,"rounding":0,"code":"UZS","name_plural":"Uzbekistan som"},"VEF":{"symbol":"Bs.F.","name":"Venezuelan Bolívar","symbol_native":"Bs.F.","decimal_digits":2,"rounding":0,"code":"VEF","name_plural":"Venezuelan bolívars"},"VND":{"symbol":"₫","name":"Vietnamese Dong","symbol_native":"₫","decimal_digits":0,"rounding":0,"code":"VND","name_plural":"Vietnamese dong"},"XAF":{"symbol":"FCFA","name":"CFA Franc BEAC","symbol_native":"FCFA","decimal_digits":0,"rounding":0,"code":"XAF","name_plural":"CFA francs BEAC"},"XOF":{"symbol":"CFA","name":"CFA Franc BCEAO","symbol_native":"CFA","decimal_digits":0,"rounding":0,"code":"XOF","name_plural":"CFA francs BCEAO"},"YER":{"symbol":"YR","name":"Yemeni Rial","symbol_native":"ر.ي.‏","decimal_digits":0,"rounding":0,"code":"YER","name_plural":"Yemeni rials"},"ZAR":{"symbol":"R","name":"South African Rand","symbol_native":"R","decimal_digits":2,"rounding":0,"code":"ZAR","name_plural":"South African rand"},"ZMK":{"symbol":"ZK","name":"Zambian Kwacha","symbol_native":"ZK","decimal_digits":0,"rounding":0,"code":"ZMK","name_plural":"Zambian kwachas"}}
      var Shopify = Shopify || {};
      // ---------------------------------------------------------------------------
      // Money format handler
      // ---------------------------------------------------------------------------

      if((typeof allcurrenceis[window.ShopifyAnalytics.meta.currency] != 'undefined') && (typeof allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"] != 'undefined') && window.ShopifyAnalytics.meta.currency != 'GEL'){
        if(window.ShopifyAnalytics.meta.currency == 'HUF'){
          Shopify.money_format_sellup = "{{amount_no_decimals_with_comma_separator}} "+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"];
        }else if(window.ShopifyAnalytics.meta.currency == 'EUR' && window.Shopify.shop == "babyphone-8trades.myshopify.com"){
          Shopify.money_format_sellup = "{{amount_with_comma_separator}} "+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"];
        }else if(window.ShopifyAnalytics.meta.currency == 'AED' && window.Shopify.shop == "opto-watch-co.myshopify.com"){
          Shopify.money_format_sellup = "Dhs. {{amount}}";
        }else if(window.ShopifyAnalytics.meta.currency == 'DKK' && (window.Shopify.shop == "goodiebox-popup.myshopify.com" || window.Shopify.shop == "commedeuxshop.myshopify.com" || window.Shopify.shop == "petlux.myshopify.com")){
          Shopify.money_format_sellup = "{{amount_with_comma_separator}} "+window.ShopifyAnalytics.meta.currency;
        }else if(window.ShopifyAnalytics.meta.currency == 'PLN'){
          Shopify.money_format_sellup = "{{amount_with_comma_separator}} "+window.ShopifyAnalytics.meta.currency;
        }else if(window.ShopifyAnalytics.meta.currency == 'TRY'){
          Shopify.money_format_sellup = "{{amount_no_decimals_with_comma_separator}}"+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"];
        }else if(window.ShopifyAnalytics.meta.currency == 'DKK' && window.Shopify.shop == "dktrimmer.myshopify.com"){
          Shopify.money_format_sellup = "{{amount}} "+allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"];
        }else{
          Shopify.money_format_sellup = allcurrenceis[window.ShopifyAnalytics.meta.currency]["symbol_native"]+"{{amount}}";
        }
      }else{
        Shopify.money_format_sellup = "{{amount}} "+window.ShopifyAnalytics.meta.currency;   
      }

      Shopify.formatMoneySellUp = function(cents, format) {
        if (typeof cents == 'string') { cents = cents.replace('.',''); }
        var value = '';
        var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
        var formatString = (format || this.money_format_sellup);

        function defaultOption(opt, def) {
           return (typeof opt == 'undefined' ? def : opt);
        }

        function formatWithDelimiters(number, precision, thousands, decimal) {
          precision = defaultOption(precision, 2);
          thousands = defaultOption(thousands, ',');
          decimal   = defaultOption(decimal, '.');

          if (isNaN(number) || number == null) { return 0; }

          number = (number/100.0).toFixed(precision);

          var parts   = number.split('.'),
              dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
              cents   = parts[1] ? (decimal + parts[1]) : '';

            return dollars + cents;
        }

        switch(formatString.match(placeholderRegex)[1]) {
          case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
          case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
          case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
          case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
        }

        return formatString.replace(placeholderRegex, value);
      };
      if (cart_template == "cart"){
      
        function owlfun(){
          /**
          * Owl Carousel v2.3.4
          * Copyright 2013-2018 David Deutsch
          * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
          */
          !function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
          animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
        }

        jQueryCode1 = function(){
            
          $(document).ready(function(){
            function responsive(){
              owlfun();
              var current_width = $(window).width();
              if(current_width < 481){
                $( "body #kartify_upsell_product_wrapper .upsellproductcount3" ).css({'width': '100%'});
                $( "body #kartify_upsell_product_wrapper .upsellproductcount2" ).css({'width': '100%'});
                $( "body #kartify_upsell_product_wrapper .upsellproductcount1" ).css({'width': '100%'});
                $('body #kartify_upsell_product_wrapper').addClass("owl-carousel owl-theme").removeClass("m768").removeClass("desktop").removeClass("m480");
                $('body #kartify_upsell_product_wrapper').owlCarousel({
                  loop:true,
                  margin:10,
                  nav:true,
                  responsiveClass: true,
                  responsive:{
                    0:{
                      items:1
                    },
                    600:{
                      items:3
                    },
                    1000:{
                      items:5
                    }
                  }
                })
              }
              else if(current_width < 739){
                $( "body #kartify_upsell_product_wrapper .upsellproductcount3" ).css({'width': '33.33%'});
                $( "body #kartify_upsell_product_wrapper .upsellproductcount2" ).css({'width': '33.33%',"margin":"0 auto"});
                $( "body #kartify_upsell_product_wrapper .upsellproductcount1" ).css({'width': '33.33%',"margin":"0 auto"});
                $('body #kartify_upsell_product_wrapper').addClass("m768").removeClass("desktop").removeClass("owl-carousel owl-theme").removeClass("tablet");
                $('body #kartify_upsell_product_wrapper').trigger('destroy.owl.carousel');
              }
              else if(current_width < 970){
                $( "body #kartify_upsell_product_wrapper .upsellproductcount3" ).css({'width': '33.33%',"margin":"0 auto"});
                $( "body #kartify_upsell_product_wrapper .upsellproductcount2" ).css({'width': '33.33%',"margin":"0 auto"});
                $( "body #kartify_upsell_product_wrapper .upsellproductcount1" ).css({'width': '33.33%',"margin":"0 auto"});
                $('body #kartify_upsell_product_wrapper').addClass("tablet").removeClass("desktop").removeClass("owl-carousel owl-theme").removeClass("m768");
                $('body #kartify_upsell_product_wrapper').trigger('destroy.owl.carousel');
              }
              else if (current_width > 971){
                $( "body #kartify_upsell_product_wrapper .upsellproductcount3" ).css({'width': '33.33%',"margin":"0 auto"});
                $( "body #kartify_upsell_product_wrapper .upsellproductcount2" ).css({'width': '33.33%',"margin":"0 auto"});
                $( "body #kartify_upsell_product_wrapper .upsellproductcount1" ).css({'width': '33.33%',"margin":"0 auto"});
                $('body #kartify_upsell_product_wrapper').addClass("desktop").removeClass("owl-carousel owl-theme").removeClass("m768").removeClass("tablet");
                $('body #kartify_upsell_product_wrapper').trigger('destroy.owl.carousel');
              }
            }

            $(window).resize(function(){
              responsive()
            });
              
            var script = document.createElement('script'); 
            document.head.appendChild(script);  
            script.type = 'text/javascript';
            script.src = "//cdn.rawgit.com/noelboss/featherlight/1.2.3/release/featherlight.min.js";
            // console.log("jquery called")
            var str = __st.pageurl

            var rest = str.substring(0, str.lastIndexOf("/") + 1);
            var template = str.substring(str.lastIndexOf("/") + 1, str.length);
            var shop_name = Shopify.shop;
              var base_url = 'https://sellup.herokuapp.com';
            if (template == "cart") {
              $('head').append('<link type="text/css" href="'+base_url+'/kartifyjs/kartify.css" rel="stylesheet">');
              $('head').append('<link type="text/css" href="'+base_url+'/upseller/upseller.css?'+Math.random()+'" rel="stylesheet">');
              // ----------------------- --here------------------------
              $.ajax({
                dataType: 'json',
                async: false, 
                url: '/cart.js',
                success: function(data) {
                  if (data['items'].length != 0) {
                    arr = [];
                    $.each(data["items"], function( key, value ) {
                      arr.push(value.product_id)
                    })
                    // items_ids = JSON.stringify(arr);
                    items_ids = arr;
                    if (items_ids != undefined) {
                      var url = base_url+'/output/cart_view.json?shop='+shop_name+'&items='+JSON.stringify(items_ids);
                    }
                    // --------------------------end-------------------------
                    $.ajax({
                      crossOrigin: true,
                      url: url,
                      success: function(data) {
                        // console.log(data);
                        if (data["success"] == true) {
                          // console.log('888888888888888');
                          // console.log(data["cart_upsells_found_or_not"]);

                          function cartupsells_viewcount(){
                            if(data["cart_upsells_found_or_not"] == true || data["upcart_heading"]["default_cart_use"] != 'auto'){
                              // console.log('%ccart upsells found!', 'color: green;');
                              var sellup_ids = []
                              var cartupsell_pids = []
                              $.each( data["default_cart_upsell"], function( index, value ){
                                sellup_ids.push(value['sellup_id'])
                                cartupsell_pids.push(value['id'])
                              });
                              sellup_ids = [...new Set(sellup_ids)];
                              // console.log(sellup_ids);
                              // console.log(cartupsell_pids);
                              var token1 = generateToken();
                              var sub_url = 'https://analytics-sellup.herokuapp.com';
                              if(sellup_ids.length != 0){
                                $.each( sellup_ids, function(index, value){
                                  if(value != ""){
                                    var url_ind_pr = base_url+'/output/individual_detail.json?sellup_id='+value;
                                    $.ajax({
                                      crossOrigin: true,
                                      url: url_ind_pr,
                                      success: function(data) {
                                        var cartupsell_viewedpids = []

                                        $.each(data["ind_upsell_data"], function(index, item) {
                                          $.each(cartupsell_pids, function(index1, item1) {
                                            if (item == item1){
                                              // data["ind_upsell_data"].splice(index , 1);
                                              cartupsell_viewedpids.push(item)
                                            }
                                          });
                                        });
                                        // console.log('data')
                                        // console.log(cartupsell_viewedpids)
                                        // console.log(value)
                                        $.post( sub_url+'/upsell_views',{ shop: shop_name, visit_token: token1,visitor_token: token1,event_type: "$view", sellup_id: value, ind_upsell_data: cartupsell_viewedpids, time: Math.round(+new Date()/1000) }).always(function() {
                                        });
                                      }
                                    });
                                  }else{

                                  }
                                });
                              }
                            }else{
                              // console.log('Recommendation products are appearing!')
                              var token1 = generateToken();
                              var sub_url = 'https://analytics-sellup.herokuapp.com'
                              var cartupsell_pids = []
                              $.each( data["default_cart_upsell"], function( index, value ){
                                cartupsell_pids.push(value['id'])
                              });

                              $.post( sub_url+'/upsell_views',{ shop: shop_name, visit_token: token1,visitor_token: token1,event_type: "$view", sellup_id: '', ind_upsell_data: cartupsell_pids, time: Math.round(+new Date()/1000) }).always(function() {
                              });
                            }
                          }

                          function main_success() {
                          // const myJSON = ''+JSON.stringify(Shopify.theme)+'';
                          // const myObj = JSON.parse(myJSON);
                          setting = data["settings"];
                          // const theme_name = Shopify.theme.name
                          var cartstyle='';
                          var button_class='';
                            // if (theme_name == 'Dawn'){
                              cartstyle = 'display: flex;flex-direction: column;';
                              button_class = 'button Button button-primary';
                            // }

                            var pricestylestoapply = '';
                            var pricestyletoapply = '';
                            var comppricestyletoapply = '';

                            pricestylestoapply = 'display: flex;justify-content: center;';
                            if(data["settings"]["up_price_font_size"] != ''){
                                pricestylestoapply += 'font-size:'+data["settings"]["up_price_font_size"]+'px;'
                            }
                            if(data["settings"]["up_price_font_color"] != ''){
                                pricestyletoapply += 'color:'+data["settings"]["up_price_font_color"]+';';
                                pricestyletoapply += 'font-size:'+data["settings"]["up_price_font_size"]+'px;'
                            }
                            if(data["settings"]["up_comp_price_font_color"] != ''){
                                comppricestyletoapply += 'color:'+data["settings"]["up_comp_price_font_color"]+';';
                                comppricestyletoapply += 'font-size:'+data["settings"]["up_price_font_size"]+'px;'
                                comppricestyletoapply += 'margin-right: 10px;'
                            }
                            var status = data["success"];
                            if(status == true){
                                var producthtml = function(productdetail,count,cart_upsell_no,selected_id,sellup_id,ind_product_id){

                                    var prod = null;
                                    $.ajax({
                                        dataType: 'json',
                                        async: false, 
                                        url: window.Shopify.routes.root + 'products/' + productdetail + '.js',
                                        success: function(product) {
                                          prod = product;    
                                        },
                                        error: function() {
                                        var url1 = base_url + '/output/upsell_offer_product_data.json?shop=' + shop_name + '&product_id=' + ind_product_id;
                                        var shop_locale = Shopify.locale
                                          $.ajax({
                                            dataType: 'json',
                                            async: false,
                                            url: url1,
                                            data: {
                                              shop_locale: shop_locale
                                            },
                                            success: function(product) {
                                            const product_data = product.upsell_offer_product;
                                            const translate_handle = product.translated_handle;
                                              let handle1 = translate_handle || product_data.handle;
                                              $.ajax({
                                                dataType: 'json',
                                                async: false,
                                                url: window.Shopify.routes.root + 'products/' + handle1 + '.js',
                                                success: function(product) {
                                                  prod = product;
                                                },
                                                  error: function() {
                                                  }
                                              });

                                            },
                                            error: function() {
                                            }
                                          })      
                                        }
                                    })
                                          
                                    if(prod == null){
                                        return ''
                                    }
                                    else{
                                        var vcount = $.map(prod["variants"], function(n, i) { return i; }).length; 

                                        // -----------------start here--------------
                                        if (selected_id != '' && selected_id != undefined){
                                          var selected_variant = $.grep(prod["variants"], function (element, index) {return element.id == selected_id && element.available; })[0];
                                          if (!selected_variant) {
                                            return '';
                                          }
                                          if(typeof selected_variant !== 'undefined' && typeof selected_variant["featured_image"] !== 'undefined' && selected_variant["featured_image"] != null){
                                            var selected_variant_img = selected_variant["featured_image"]["src"];
                                          }
                                          else{
                                            var selected_variant_img = prod["featured_image"];
                                          }
                                          var firstvariantprice = selected_variant["price"];
                                          var firstvariantcprice = selected_variant["compare_at_price"];
                                        }
                                        else{
                                          var selected_variant = prod["variants"][0]
                                          var selected_variant_img = prod["featured_image"];
                                          if (vcount == 1){
                                            var selected_id = selected_variant["id"]
                                          }else{
                                            var selected_id = "";
                                          }
                                          var firstvariantprice = prod["variants"][0]["price"];
                                          var firstvariantcprice = prod["variants"][0]["compare_at_price"];
                                        }
                                        // if (typeof selected_variant === 'undefined'){
                                        //   var selected_variant = prod["variants"][0]
                                        // }
                                        
                                        // ------------------end---------------


                                        var cp_html = '';     
                                        if((firstvariantcprice) && (firstvariantcprice != '') && (firstvariantcprice > firstvariantprice)){
                                            if(Shopify.currency['active'] == 'CLP'){
                                                var firstvariantcprice = Shopify.formatMoneySellUp(firstvariantcprice);
                                                firstvariantcprice = firstvariantcprice.substring(0, firstvariantcprice.length - 3);
                                                firstvariantcprice = firstvariantcprice.replace(",", ".");
                                                //final_price_v = final_price_v/1000;
                                            }else{
                                                var firstvariantcprice = Shopify.formatMoneySellUp(firstvariantcprice);
                                            }
                                            cp_html = '<span class="compareprice launchtip_price" style="justify-content: center;'+comppricestyletoapply+'">'+firstvariantcprice+'</span>'
                                        }else{
                                          cp_html = '';
                                        }
                                        var addcart_text = data["settings"]["cart_upsell_addcart"];
                                        if(addcart_text != "" && addcart_text != null){

                                        }else{
                                            addcart_text = 'Add To Cart'
                                        }
                                        if (selected_id != '' && selected_id != undefined) {
                                          if(Shopify.currency['active'] == 'JPY'){
                                              var final_price_v = Shopify.formatMoneySellUp(selected_variant["price"]);
                                              final_price_v = final_price_v.substring(0, final_price_v.length - 3);
                                          }else if(Shopify.currency['active'] == 'CLP'){
                                              var final_price_v = Shopify.formatMoneySellUp(selected_variant["price"]);
                                              final_price_v = final_price_v.substring(0, final_price_v.length - 3);
                                              final_price_v = final_price_v.replace(",", ".");
                                              //final_price_v = final_price_v/1000;
                                          }else{
                                              var final_price_v = Shopify.formatMoneySellUp(selected_variant["price"]);
                                          }
                                        }else{
                                          if(Shopify.currency['active'] == 'JPY'){
                                              var final_price_v = Shopify.formatMoneySellUp(prod["price"]);
                                              final_price_v = final_price_v.substring(0, final_price_v.length - 3);
                                          }else if(Shopify.currency['active'] == 'CLP'){
                                              var final_price_v = Shopify.formatMoneySellUp(prod["price"]);
                                              final_price_v = final_price_v.substring(0, final_price_v.length - 3);
                                              final_price_v = final_price_v.replace(",", ".");
                                              //final_price_v = final_price_v/1000;
                                          }else{
                                              var final_price_v = Shopify.formatMoneySellUp(prod["price"]);
                                          }
                                        }
                                        var popup_heading_text_value = data["settings"]["popup_heading_text"];
                                        var btnstyletoapply = '';
                                        if(data["settings"]["up_button_font_size"] != ''){
                                          btnstyletoapply += 'font-size:'+data["settings"]["up_button_font_size"]+'px;'
                                        }
                                        if(data["settings"]["up_button_bg_color"] != ''){
                                          btnstyletoapply += 'background-color:'+data["settings"]["up_button_bg_color"]+';';
                                        }
                                        if(data["settings"]["up_button_font_color"] != ''){
                                          btnstyletoapply += 'color:'+data["settings"]["up_button_font_color"]+';';
                                        }

                                        //Variant based code start/.///////////////////////

                                        var link_html='';
                                        var vhtml= '';
                                        var voption1 = '';
                                        var vselectlist = '';
                                        var main_price = (Math.round(selected_variant['price']) / 100).toFixed(2);
                                        
                                        if(selected_id == ''){
                                            // selected_id = prod["variants"][0]["id"]
                                            $.each(prod["variants"], function( key, value ) {
                                                voption1 += '<option value="'+value.id+'">'+value.title+'</option></option>'
                                            })

                                            vselectlist = '<select name="id" class="launchtip_select_wrapper" style="display:none;">'+voption1+'</select>'
                                            var allprodoption = '';
                                            $.each(prod["options"], function( key, value ) {
                                                var voptionlist = '';   
                                                var select_lable = "<label>"+value.name+"</label>";
                                                $.each(value["values"], function( key1, val ) {
                                                  voptionlist += '<option value="'+val+'">'+val+'</option>'
                                                })

                                                voptionselectlist = '<div class="launchtip_select_option_wrapper">'+select_lable+'<select class="launchtip_select_option_list">'+voptionlist+'</select></div>'
                                                allprodoption += voptionselectlist
                                            })
                                            
                                            var popupform = '<form action="#" method="post" class="LaunchTipAddToCartForm launchtipsellupform" enctype="multipart/form-data">\
                                            <div class="provariantdata" style="display:none;">'+JSON.stringify(prod)+'</div>\
                                            <div class="popupmsg" style="height:0;"></div>\
                                            <div class="popuppricediv">'+final_price_v+'<input type="hidden" value="'+main_price+'" class="main_price"></div>\
                                            '+vselectlist+'<div class="launchtip_select_options_div">'+allprodoption+'</div><input type="hidden" name="quantity" value="1"><input type="hidden" name="properties[_sellup_id]" value="'+sellup_id+'">\
                                            <button type="submit" name="add" ind_product_id="'+prod['id']+'" sell-id="'+sellup_id+'" class="btn add-to-cart launchtip_add_to_cart launchtip_upsellpopup_design" style="'+btnstyletoapply+'border: none;cursor: pointer;width: 100%;" ><span class="add-to-cart__text" data-text="'+addcart_text+'">'+addcart_text+'</span></button>\
                                            </form>';
                                        }else{
                                        }

                                        if (vcount > 0 || selected_id != '') {
                                            vhtml = '<input type="hidden" name="id" value="'+selected_id+'">'
                                        }else{
                                            var voption = '';
                                            $.each(prod["variants"], function( key, value ) {
                                            voption += '<option value="'+value.id+'">'+value.title+'</option></option>';
                                            })
                                            vhtml = '<select name="id" class="launchtip_select_wrapper">'+voption+'</select>';
                                        }

                                        if (vcount > 0 ) {
                                          if (selected_id != '' && selected_id != undefined) {
                                            link_html = '<form action="#" method="post" class="LaunchTipAddToCartForm" enctype="multipart/form-data">\
                                                <input type="hidden" name="id" value="'+selected_id+'">\
                                                <input type="hidden" name="properties[_sellup_id]" value="'+sellup_id+'"><input type="hidden" value="'+main_price+'" class="main_price">\
                                                  <button type="submit" name="add" ind_product_id="'+prod['id']+'" sell-id="'+sellup_id+'" id="AddToCart1" class="btn launchtip_add_to_cart launchtip_upsell_design add-to-cart" style="'+btnstyletoapply+'border: none;cursor: pointer;float: none;"><span class="add-to-cart__text">'+addcart_text+'</span></button>\
                                                </form>'
                                          }else{
                                            link_html = '<form action="#" method="post" class="LaunchTipAddToCartForm" enctype="multipart/form-data">\
                                                <input type="hidden" name="id" value="'+prod["variants"][0]["id"]+'">\
                                                <input type="hidden" name="properties[_sellup_id]" value="'+sellup_id+'"><input type="hidden" value="'+main_price+'" class="main_price">\
                                                  <button type="submit" name="add" ind_product_id="'+prod['id']+'" sell-id="'+sellup_id+'" id="AddToCart1" class="btn launchtip_add_to_cart launchtip_upsell_design add-to-cart" style="'+btnstyletoapply+'border: none;cursor: pointer;float: none;"><span class="add-to-cart__text">'+addcart_text+'</span></button>\
                                                </form>'
                                          }
                                        }

                                        if (vcount > 1 && selected_id == ''){
                                          var finalhtml_button = '<button class="btn openbox launchtip_upsell_design" style="'+btnstyletoapply+' border: none;cursor: pointer;float: none;" href="#fl'+count+cart_upsell_no+'"><span class="add-to-cart__text">'+addcart_text+'</span></button>';
                                        }
                                        else{
                                            var finalhtml_button = link_html;
                                        }

                                        var var_in_stock = false;
                                        $.each(prod["variants"], function( key, value ) {
                                          if(value.available == true){
                                            var_in_stock = true;
                                          }
                                        })
                                        if (vcount == 1 && var_in_stock == false) {
                                            return '';
                                        }else if(vcount > 1 && var_in_stock == false){
                                            return '';
                                        }else{
                                          var product_image_container = '<div class="image">\
                                              <a href="'+window.Shopify.routes.root+'products/'+prod["handle"]+'">\
                                                <img style="max-width: 100% !important;" src="'+prod["featured_image"]+'" alt="'+prod["title"].replace(/"/g, '').replace(/'/g, '')+'" />\
                                              </a>\
                                            </div>';
                                          if (selected_variant_img == null) {
                                            product_image_container = "";
                                          }
                                          
                                          return '<div id="product-' + prod["handle"] + '" class="item productbox upsellproductcount' + count + '">' + 
                                              product_image_container + 
                                              '<div class="details">\
                                            <a href="' + window.Shopify.routes.root + 'products/' + prod["handle"] + '" style="text-decoration: none;color:' + data["settings"]["up_title_font_color"] + '">\
                                            <span class="title">' + prod["title"] + '</span>\
                                            </a>\
                                            <div style="' + pricestylestoapply + '">' + cp_html + '<span class="launchtip_price" style="justify-content: center;' + pricestyletoapply + '">' + final_price_v + '</span></div>\
                                            <div class="launchtip_upsell_lightbox launchtiplightbox upsell_variants" id="fl' + count + cart_upsell_no + '">\
                                            <h3>' + popup_heading_text_value + '</h3>\
                                            <div class="lbimg">' + 
                                                (selected_variant_img 
                                                  ? '<img style="max-width: 250px;height: auto;width:100%;margin: auto;display: block;" class="lightboximage" src="' + selected_variant_img + '" alt="' + prod["title"].replace(/"/g, '').replace(/'/g, '') + '" />' 
                                                  : ''
                                                ) + 
                                                '\
                                            ' + popupform + '\
                                            </div>\
                                            </div>\
                                            \
                                            ' + finalhtml_button + '\
                                            </div>\
                                            </div>';
 
                                        }
                                    }
                                }
                            }       
                            var upsell_display_product_count = 0;
                            if (data["default_cart_upsell"][0] != undefined){
                                upsell_display_product_count = upsell_display_product_count+1;
                            }
                            if(data["default_cart_upsell"][1] != undefined){
                                upsell_display_product_count = upsell_display_product_count+1;
                            }
                            if(data["default_cart_upsell"][2] != undefined){
                                upsell_display_product_count = upsell_display_product_count+1;
                            }
                            var upsellproducts = ''
                            if (data["default_cart_upsell"][0] != undefined){
                                var cart_upsell_no = 1;
                                var firstproduct = producthtml(data["default_cart_upsell"][0]["handle"],upsell_display_product_count,cart_upsell_no,data["default_cart_upsell"][0]["v_id"],data["default_cart_upsell"][0]["sellup_id"],data["default_cart_upsell"][0]["id"])
                                upsellproducts += firstproduct;
                            }

                            if(data["default_cart_upsell"][1] != undefined){
                                var cart_upsell_no = 2;
                                var secondproduct = producthtml(data["default_cart_upsell"][1]["handle"],upsell_display_product_count,cart_upsell_no,data["default_cart_upsell"][1]["v_id"],data["default_cart_upsell"][1]["sellup_id"],data["default_cart_upsell"][1]["id"])
                                upsellproducts += secondproduct;
                            }
                            if(data["default_cart_upsell"][2] != undefined){
                                var cart_upsell_no = 3;
                                var thirdproduct =producthtml(data["default_cart_upsell"][2]["handle"],upsell_display_product_count,cart_upsell_no,data["default_cart_upsell"][2]["v_id"],data["default_cart_upsell"][2]["sellup_id"],data["default_cart_upsell"][2]["id"]) 
                                upsellproducts += thirdproduct;
                            }
                            var upsellheadinghtml = ''
                            var upsellheading = data["settings"]["cart_title"]
                            if(upsellheading != '' && upsellheading != null){
                                upsellheadinghtml = '<div id="kartify_upsell_heading"><h3 class="kartify_upsell_heading_h3">'+upsellheading+'</h3></div>';
                            }else{
                                upsellheading = 'You may like this:'
                              upsellheadinghtml = '<div id="kartify_upsell_heading"><h3 class="kartify_upsell_heading_h3">'+upsellheading+'</h3></div>';
                            }
                            var finalupsellhtml = '<div id="kartify_upsell_product_wrapper" class="totalcount'+upsell_display_product_count+'">'+upsellproducts+'</div>';
                            if($("#kartify_upsell_wrapper").length){
                              $("#kartify_upsell_wrapper").html(upsellheadinghtml+finalupsellhtml);  
                            }else {
                              $("form[action*='/cart']").append('<div id="kartify_upsell_wrapper" style="'+cartstyle+'">'+upsellheadinghtml+finalupsellhtml+'</div>'); 
                            }
                            responsive();
                            cartupsells_viewcount();
                              if($("#kartify_upsell_product_wrapper").children("div").length === 0) {
                                $("#kartify_upsell_heading").hide();
                              }
                          }

                          if (data["cart_upsells_found_or_not"] == false) {
                            if (data["upcart_heading"]["default_cart_use"] == 'auto') {
                              // console.log('auto');
                              fetch(window.Shopify.routes.root + "recommendations/products.json?product_id="+items_ids[0]+"&limit=3")
                                .then(response => response.json())
                                .then(({ products }) => {
                                  if (products.length > 0) {
                                    // const firstRecommendedProduct = products[0];
                                    data["default_cart_upsell"] = products;
                                    main_success();
                                  }
                                }
                              );
                            }else{
                              // console.log('custom');
                              main_success();
                            }
                          }else{
                            // console.log('cart_upsells_found');
                            main_success();
                          }
                        }

                        setTimeout(function() {
                          hype_cart_detect($);
                        }, 1000);
                      }
                    });
                  }
                }
              });


              var configuration = ({
                afterOpen: function(event){
                 $(document).find('.featherlight').find('.launchtip_select_option_list').trigger('click');
                },
                beforeOpen: function(event){
                  var variant_popup_bg_color = (setting['popup_bg_color'] == '' || setting['popup_bg_color'] == null) ? '#fff' : setting['popup_bg_color'];
                  $('.launchtip_upsell_lightbox h3').attr("style", "color: "+setting['popup_font_color']+";");
                  $('.featherlight-close').attr("style", "background-color: transparent !important; color: "+setting['popup_button_color']+";");
                  $('.launchtip_upsell_lightbox select, .launchtip_upsell_lightbox input').attr("style", "background-color: "+setting['popup_bg_color']+" !important; color: "+setting['popup_font_color']+";");
                  $('.featherlight-content').attr("style", "background-color: "+variant_popup_bg_color+" !important; border-color: "+setting['popup_border_color']+" !important; color: "+setting['popup_font_color']+";");
                  $('.launchtip_upsell_lightbox select.launchtip_select_wrapper').hide();
                  //code here
                  $('.featherlight').addClass('sellup-cart');
                }
              });
              $(document).on("click",".openbox",function(e) {
                e.preventDefault();
                var this_id = $(this).attr('href');
                $.featherlight(this_id, configuration);
              });

              // $('.launchtip_select_option_list').on('change', function() {
              //   alert( this.value );
              // });

              function get_selectect_variant_lightbox(variant_id,form){
                var prod = JSON.parse($(form).find('.provariantdata').text())

                var pro_variants = prod['variants']
                var selected_variant = $.grep(pro_variants, function (element, index) {return element.id == variant_id; })[0];
                if(selected_variant["featured_image"] != null){
                    var selected_variant_img = selected_variant["featured_image"]["src"];
                }
                else{
                    var selected_variant_img = prod["featured_image"];
                }
                  // $(form).closest('.lightbox').find('.lightboximage').addClass("test");
                $(form).closest('.launchtip_upsell_lightbox').find('.lightboximage').attr("src",selected_variant_img);
                var selected_variant_firstvariantprice = selected_variant["price"];
                var selected_variant_firstvariantcprice = selected_variant["compare_at_price"];
                // var main_price = (Math.round(selected_variant_firstvariantprice) / 100).toFixed(2);
                var cp_html = '';
                if((selected_variant_firstvariantcprice) && (selected_variant_firstvariantcprice != '') && (selected_variant_firstvariantcprice > selected_variant_firstvariantprice)){
                // var comp_text = '';

                // if(setting.up_comp_price_text != ''){
                //   comp_text = setting.up_comp_price_text;
                // }

                // var final_price_v = Shopify.formatMoneySellUp(selected_variant_firstvariantcprice);

                // if(Shopify.currency['active'] == 'JPY' || Shopify.currency['active'] == 'LBP'){
                //     var selected_variant_firstvariantcprice = final_price_v.substring(0, final_price_v.length - 3);
                // }else{
                //     var selected_variant_firstvariantcprice = final_price_v;
                // }
                // var pricestyletoapply = '';
                // var comppricestyletoapply = '';
                // if(setting.up_price_font_size != '' && setting.up_price_font_size != null){
                //   pricestylestoapply += 'font-size:'+setting.up_price_font_size+'px;'
                // }
                // if(setting.up_price_font_color != '' && setting.up_price_font_color != null){
                //   pricestyletoapply += 'color:'+setting.up_price_font_color+';';
                //   pricestyletoapply += 'font-size:'+setting.up_price_font_size+'px;'
                // }
                // if(setting.up_comp_price_font_color != '' && setting.up_comp_price_font_color != null){
                //   comppricestyletoapply += 'color:'+setting.up_comp_price_font_color+';';
                //   comppricestyletoapply += 'font-size:'+setting.up_price_font_size+'px;'
                // }

                //cp_html = '<span class="compareprice price" style="text-decoration: line-through;'+comppricestyletoapply+'">'+comp_text+' '+firstvariantcprice+'</span>'
                }else{
                cp_html = '';
                //cp_html = '<span class="compareprice price" style=""></span>';
                }
                // var price_text = '';
                // if(setting.up_price_text != ''){
                //   price_text = setting.up_price_text;
                // }
                // var sold_out_text_value = '';
                // if(setting.sold_out_text != ''){
                //   sold_out_text_value = setting.sold_out_text;
                // }

                var final_price_v = Shopify.formatMoneySellUp(selected_variant_firstvariantprice);
                var main_price = (Math.round(selected_variant_firstvariantprice) / 100).toFixed(2);
                // var main_price = selected_variant_firstvariantprice;

                if(Shopify.currency['active'] == 'JPY' || Shopify.currency['active'] == 'LBP'){
                    var selected_variant_firstvariantprice = final_price_v.substring(0, final_price_v.length - 3);
                }else{
                    var selected_variant_firstvariantprice = final_price_v;
                }
                // var pricestyletoapply = '';
                // if(setting.up_price_font_size != '' && setting.up_price_font_size != null){
                //   pricestyletoapply += 'font-size:'+setting.up_price_font_size+'px;'
                // }
                // if(setting.up_price_font_color != '' && setting.up_price_font_color != null){
                //   pricestyletoapply += 'color:'+setting.up_price_font_color+';';
                // }
                  $(form).find('.popuppricediv').html(selected_variant_firstvariantprice+'</span><input type="hidden" value="'+main_price+'" class="main_price"></div>');
                    if (selected_variant.available == false) {
                        $(form).find('button').find('span').text("Sold Out")
                        $(form).find('button').attr("disabled", true);
                    }
                    else{
                        var pbtntext = $(form).find('button').find('span').attr('data-text')
                        $(form).find('button').find('span').text(pbtntext)
                        $(form).find('button').attr("disabled", false); 
                    }

              }
                  
              function change_popup_selection(form){
                  $(form).find('.popupmsg').text('');
                  var getselectedvaluetext = ''
                  $(form).find('.launchtip_select_option_list').each(function(index) {
                      if(index == 0){
                          getselectedvaluetext += $(this).find("option:selected").text()
                      }
                      else{
                          getselectedvaluetext += ' / '+$(this).find("option:selected").text()
                      }
                  });
                  var valid = false
                  $(form).find(".launchtip_select_wrapper").find('option').each(function(){
                      if ($(this).text() == getselectedvaluetext){
                          // $(this).attr("selected","selected");
                          $(this).prop("selected",true);
                          get_selectect_variant_lightbox(this.value,form)
                          $(form).find('.popupmsg').text(''); 
                          valid = true
                          // $(form).find('button').find('span').text('Add this')
                          // $(form).find('button').attr("disabled", false);  
                          // return false;
                      }else{
                          $(this).prop("selected",false);
                      }
                      // else{
                      //     $(form).find('button').find('span').text('Unavailable')
                      //     $(form).find('button').attr("disabled", true);
                      // }
                  });
                  if (valid==false) {
                      $(form).find('button').find('span').text('Unavailable')
                      $(form).find('button').attr("disabled", true);
                  }
              }
              $(document).on("change click",".launchtip_select_option_list",function(e) {
                change_popup_selection($(this).closest('form'));
              });

              $(document).on("click",".LaunchTipAddToCartForm .launchtip_add_to_cart,form#AddToCartForm button#AddToCart",function(e){
                  e.preventDefault();
                  var thiselement = $(this);
                  var originalStyle = thiselement.attr('style');
                  thiselement.prop('disabled', true);
                  thiselement.css({"background-color": "grey", "cursor": "not-allowed"});

                  var individual_product_id = $(this).attr('ind_product_id');
                  var m_price = $(this).closest('form').find('.main_price').val();
                  var token1 = generateToken();
                  var sellup_id = $(this).attr('sell-id');
                  var formData = $(this).closest('form').serialize();
                  // console.log($(this).closest('form').serialize());
                  var params = {
                    type: 'POST',
                    url: '/cart/add.js',
                    data: formData,
                    dataType: 'json',
                    success: function(line_item) { 
                      thiselement.prop('disabled', false);
                      thiselement.attr('style', originalStyle);
                      
                      if ((typeof callback) === 'function') {
                      }
                      else {
                        var all = $.featherlight.opened();
                        // -------------added here-----------
                        // var btn = $(this).closest('form').find('button.launchtip_add_to_cart')

                        var sub_url = 'https://analytics-sellup.herokuapp.com';
                        $.post( sub_url+'/upsell_views',{ shop: shop_name,individual_product_id: individual_product_id, sellup_id: sellup_id, visit_token: token1, event_type: "$click",main_price: m_price, visitor_token: token1, time: Math.round(+new Date()/1000) }).always(function() {
                        
                        });
                        // $.post( sub_url+'/upsell_views',{ shop: shop_name,individual_product_id: individual_product_id, sellup_id: sellup_id, visit_token: token1, event_type: "$click",main_price: m_price, visitor_token: token1,product_id: product_id, time: Math.round(+new Date()/1000) }).always(function() {
                        
                        // });
                        // ----------------end---------------
                      }
                      $(thiselement).find('span').text("Added");
                      setTimeout(function() { window.location.reload(); }, 500);
                    },
                    error: function(XMLHttpRequest, textStatus) {
                      erroroncart(XMLHttpRequest, textStatus);
                    }
                  };
                  
                  setTimeout(function() { $.ajax(params); }, 1000);
              });
            } 
          });
        }
      
        if(window.jQuery){
          $ = window.jQuery;
          jQueryCode1(); 
        } 
        else{   
          var script = document.createElement('script'); 
          document.head.appendChild(script);  
          script.type = 'text/javascript';
          script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
          script.onload = function(){
            jQueryCode1(); 
          };
        }
      }else{
        function cartdrawer_upsells() {
          if(Shopify.theme.theme_store_id != 718 && Shopify.theme.theme_store_id != 872 && Shopify.theme.theme_store_id != 863 && Shopify.theme.theme_store_id != 1979){ // grid and symestry code cart drawer not have

            cart_detect_change();
            setTimeout(function() {
             cartdrawer_value();
            }, 200);
            cart_drawer_title_event();
          }
        }

        if(window.jQuery){
          $ = window.jQuery;
          cartdrawer_upsells();
        }else{
          var script = document.createElement('script');
          document.head.appendChild(script);
          script.type = 'text/javascript';
          script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
          script.onload = function(){
            cartdrawer_upsells();
          };
        }
      }
    }

}else{
  console.info('Sellup is already running')
}