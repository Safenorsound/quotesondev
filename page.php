<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<section class="About">
            <header class="entry-header">
         		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
         	</header><!-- .entry-header -->

			<div class="entry-content">
		<p class="font-size-p">Quotes on Dev is a project site for the RED Academy Web Developer Professional program. It&#8217;s used to experiment with Ajax, WP API, jQuery, and other cool things. 🙂
This site is heavily inspired by Chris Coyier&#8217;s <a href="http://quotesondesign.com/" target="_blank" rel="noopener">Quotes on Design</a>.</p>

	</div><!-- .entry-content -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
