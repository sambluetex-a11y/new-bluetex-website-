/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	const siteNavigation = document.getElementById( 'site-navigation' );
  document.querySelectorAll( '.menu-item-has-children' ).forEach(function (e) {e.addEventListener("mouseover", showOverlay);e.addEventListener("mouseout", hideOverlay);});

  document.querySelectorAll('.service > a, .about > a').forEach(function (e) {e.addEventListener("mouseover", changeImageInNav);});

	// Return early if the navigation don't exist.
	if ( ! siteNavigation ) {
		return;
	}

	const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];

	// Return early if the button don't exist.
	if ( 'undefined' === typeof button ) {
		return;
	}

	const menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( ! menu.classList.contains( 'nav-menu' ) ) {
		menu.classList.add( 'nav-menu' );
	}

	// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
  const nav_icon = document.getElementById('mobile-nav-trigger');
  const nav_overlay = document.getElementById('content-overlay');
	button.addEventListener( 'click', function() {
		siteNavigation.classList.toggle( 'toggled' );
    document.body.classList.toggle( 'overlay-toggled' );

    if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {
			button.setAttribute( 'aria-expanded', 'false' );
      button.setAttribute( 'aria-label', 'Expand the Mobile Menu' );
      nav_icon.src="/wp-content/themes/protapes/img/mobile-menu-open.png";
      nav_icon.width="50";
      nav_icon.alt="Expand the Mobile Menu";
      nav_overlay.classList.remove( 'toggled' );
		} else {
			button.setAttribute( 'aria-expanded', 'true' );
      button.setAttribute( 'aria-label', 'Collpase the Mobile Menu' );
      nav_icon.src="/wp-content/themes/protapes/img/mobile-menu-close.png";
      nav_icon.width="50";
      nav_icon.alt="Collpase the Mobile Menu";
      nav_overlay.classList.add( 'toggled' );
		}
	} );

	// Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
	document.addEventListener( 'click', function( event ) {
		const isClickInside = siteNavigation.contains( event.target );

		if ( ! isClickInside ) {
      siteNavigation.classList.remove( 'toggled' );
			button.setAttribute( 'aria-expanded', 'false' );
      button.setAttribute( 'aria-label', 'Expand the Mobile Menu' );
      nav_icon.width="50";
      nav_icon.src="/wp-content/themes/protapes/img/mobile-menu-open.png";
      nav_icon.alt="Expand the Mobile Menu";
      nav_overlay.classList.remove( 'toggled' );
		}
	} );

	// Get all the link elements within the menu.
	const links = menu.getElementsByTagName( 'a' );

	// Get all the link elements with children within the menu.
	const linksWithChildren = menu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

	// Toggle focus each time a menu link is focused or blurred.
	// for ( const link of links ) {
	// 	link.addEventListener( 'focus', toggleFocus, true );
	// 	link.addEventListener( 'blur', toggleFocus, true );
	// }

	// Toggle focus each time a menu link with children receive a touch event.
	for ( const link of linksWithChildren ) {
		link.addEventListener( 'click', toggleFocus, false );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		if ( event.type === 'focus' || event.type === 'blur' ) {
			let self = this;
			// Move up through the ancestors of the current link until we hit .nav-menu.
			while ( ! self.classList.contains( 'nav-menu' ) ) {
				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					self.classList.toggle( 'focus' );
				}
				self = self.parentNode;
			}
		}

		if ( event.type === 'click' ) {
			const menuItem = this.parentNode;
      event.preventDefault();

      // Scroll all sub menus back to top

      var elems = document.querySelectorAll('.sub-menu');
      for(var i=0;i<elems.length;i++){
        elems[i].scrollTop = 0;
      }
      // if (true == this.parentNode.classList.contains( 'menu-item-has-children' )) {
      //   event.preventDefault();
      //     console.log(this.parentNode.classList.contains( 'menu-item-has-children'));
      // }
			for ( const link of menuItem.parentNode.children ) {
				if ( menuItem !== link ) {
					link.classList.remove( 'focus' );
				}
			}
      //UNCOMMENT FROM HERE TO END NOTE TO REINSTALL CODE FOR ATTEMPTING TO MAKE CLICK MENU
			menuItem.classList.toggle( 'focus' );
      //UNCOMMENT FROM HERE TO START NOTE TO REINSTALL CODE FOR ATTEMPTING TO MAKE CLICK MENU

		}
	}

}() );

function showOverlay() {
  const nav_overlay = document.getElementById('content-overlay');
  nav_overlay.classList.add( 'toggled' );
}

function hideOverlay() {
  const nav_overlay = document.getElementById('content-overlay');
  nav_overlay.classList.remove( 'toggled' );
}

function changeImageInNav() {
	classlist  = this.parentNode.classList
	if (classlist.contains("service")) {
		x = document.querySelectorAll(".service.placeholder");
		if (classlist.contains("vt")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/converting-services-virtual-tour_292x202px.jpg)";
			newLink = document.querySelectorAll('.vt a')[0].href;
			newText = document.querySelectorAll('.vt a')[0].text;
			newSpan = document.querySelectorAll('.vt span')[0].innerHTML;
		} else if (classlist.contains("ww")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/converting-services-wide-web-slitting_292x202px.jpg)";
			newLink = document.querySelectorAll('.ww a')[0].href;
			newText = document.querySelectorAll('.ww a')[0].text;
			newSpan = document.querySelectorAll('.ww span')[0].innerHTML;
		} else if (classlist.contains("nw")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/converting-services-narrow-web-slitting_292x202px.jpg)";
			newLink = document.querySelectorAll('.nw a')[0].href;
			newText = document.querySelectorAll('.nw a')[0].text;
			newSpan = document.querySelectorAll('.nw span')[0].innerHTML;
		} else if (classlist.contains("ls")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/converting-services-lathe-slitting_292x202px.jpg)";
			newLink = document.querySelectorAll('.ls a')[0].href;
			newText = document.querySelectorAll('.ls a')[0].text;
			newSpan = document.querySelectorAll('.ls span')[0].innerHTML;
		} else if (classlist.contains("lm")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/converting-services-laminating_292x202px.jpg)";
			newLink = document.querySelectorAll('.lm a')[0].href;
			newText = document.querySelectorAll('.lm a')[0].text;
			newSpan = document.querySelectorAll('.lm span')[0].innerHTML;
		} else if (classlist.contains("fp")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/converting-services-flexo-printing_292x202px.jpg)";
			newLink = document.querySelectorAll('.fp a')[0].href;
			newText = document.querySelectorAll('.fp a')[0].text;
			newSpan = document.querySelectorAll('.fp span')[0].innerHTML;
		} else if (classlist.contains("ps")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/converting-services-packaging-solutions_292x202px.jpg)";
			newLink = document.querySelectorAll('.ps a')[0].href;
			newText = document.querySelectorAll('.ps a')[0].text;
			newSpan = document.querySelectorAll('.ps span')[0].innerHTML;
		} else if (classlist.contains("fd")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/converting-services-flatbed-die-cutting_292x202px.jpg)";
			newLink = document.querySelectorAll('.fd a')[0].href;
			newText = document.querySelectorAll('.fd a')[0].text;
			newSpan = document.querySelectorAll('.fd span')[0].innerHTML;
		} else if (classlist.contains("rd")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/converting-services-rotary-die-cutting_292x202px.jpg)";
			newLink = document.querySelectorAll('.rd a')[0].href;
			newText = document.querySelectorAll('.rd a')[0].text;
			newSpan = document.querySelectorAll('.rd span')[0].innerHTML;
		}
	} else {
		x = document.querySelectorAll(".about.placeholder");
		if (classlist.contains("whatdo")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/what-we-do_292x202px.jpg)";
			newLink = document.querySelectorAll('.whatdo a')[0].href;
			newText = document.querySelectorAll('.whatdo a')[0].text;
			newSpan = document.querySelectorAll('.whatdo span')[0].innerHTML;
		} else if (classlist.contains("aboutus")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/about-pro-tapes-and-specialties_292x202px.jpg)";
			newLink = document.querySelectorAll('.aboutus a')[0].href;
			newText = document.querySelectorAll('.aboutus a')[0].text;
			newSpan = document.querySelectorAll('.aboutus span')[0].innerHTML;
		} else if (classlist.contains("contactus")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/contact-pro-tapes-and-specialties_292x202px.jpg)";
			newLink = document.querySelectorAll('.contactus a')[0].href;
			newText = document.querySelectorAll('.contactus a')[0].text;
			newSpan = document.querySelectorAll('.contactus span')[0].innerHTML;
		} else if (classlist.contains("meet")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/meet-the-solutions-team-at-pro-tapes_292x202px.jpg)";
			newLink = document.querySelectorAll('.meet a')[0].href;
			newText = document.querySelectorAll('.meet a')[0].text;
			newSpan = document.querySelectorAll('.meet span')[0].innerHTML;
		} else if (classlist.contains("dir")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/directions-to-pro-tapes_292x202px.jpg)";
			newLink = document.querySelectorAll('.dir a')[0].href;
			newText = document.querySelectorAll('.dir a')[0].text;
			newSpan = document.querySelectorAll('.dir span')[0].innerHTML;
		} else if (classlist.contains("core")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/pro-tapes-core-caring_292x202px.jpg)";
			newLink = document.querySelectorAll('.core a')[0].href;
			newText = document.querySelectorAll('.core a')[0].text;
			newSpan = document.querySelectorAll('.core span')[0].innerHTML;
		} else if (classlist.contains("car")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/careers-at-pro-tapes_292x202px.jpg)";
			newLink = document.querySelectorAll('.car a')[0].href;
			newText = document.querySelectorAll('.car a')[0].text;
			newSpan = document.querySelectorAll('.car span')[0].innerHTML;
		} else if (classlist.contains("reg")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/pro-tapes-regulatory-info_292x202px.jpg)";
			newLink = document.querySelectorAll('.reg a')[0].href;
			newText = document.querySelectorAll('.reg a')[0].text;
			newSpan = document.querySelectorAll('.reg span')[0].innerHTML;
		} else if (classlist.contains("values")) {
			x[0].querySelectorAll("a")[0].style.backgroundImage = "url(/wp-content/themes/protapes/img/pro-tapes-core-values_292x202px.jpg)";
			newLink = document.querySelectorAll('.values a')[0].href;
			newText = document.querySelectorAll('.values a')[0].text;
			newSpan = document.querySelectorAll('.values span')[0].innerHTML;
		}
	}
	// x[0].href = newLink;
	x[0].querySelectorAll("a")[0].innerHTML = newText.replace(newSpan,'').concat(' <span class="menu-item-description">'+ newSpan + '</span>');
  x[0].querySelectorAll("a")[0].href = newLink;
  if (x[0].querySelectorAll("a")[0].href == 'https://www.google.com/maps/dir//621+US+Route+1+S,+North+Brunswick,+NJ+08902/@40.5203834,-74.4931516,12z/data=!4m16!1m7!3m6!1s0x89c3c6797b48276f:0xe3aaeb488f84cc54!2sUS+Rte+1+S,+North+Brunswick+Township,+NJ+08902!3b1!8m2!3d40.4673205!4d-74.4444642!4m7!1m0!1m5!1m1!1s0x89c3c670a7ab3ecf:0x44e9a4a2f3db616e!2m2!1d-74.4409451!2d40.4688843') {
    x[0].querySelectorAll("a")[0].target = '_blank';
  }
  else {x[0].querySelectorAll("a")[0].target = '_self';}


}
