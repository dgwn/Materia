<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Fuel
 *
 * Fuel is a fast, lightweight, community driven PHP5 framework.
 *
 * @package		Fuel
 * @version		1.0
 * @author		Fuel Development Team
 * @license		MIT License
 * @copyright	2010 Dan Horrigan
 * @link		http://fuelphp.com
 */

class Fuel_Request {

	/**
	 * @var	object	Holds the global request instance
	 */
	public static $instance = false;
	
	/**
	 * @var	object	Holds the global request instance
	 */
	public static $active = false;

	/**
	 * Returns the a Request object singleton
	 *
	 * @static
	 * @access	public
	 * @return	object
	 */
	public static function instance($uri = NULL)
	{
		if ( ! Request::$instance)
		{
			Request::$instance = Request::$active = new Request($uri);
		}

		return Request::$instance;
	}

	/**
	 * Returns the active request
	 *
	 * @static
	 * @access	public
	 * @return	object
	 */
	public static function active()
	{
		return Request::$active;
	}

	/**
	 * Shows a 404.  Checks to see if a 404_override route is set, if not show a default 404.
	 *
	 * @access	public
	 * @return	void
	 */
	public static function show_404()
	{
		if (Config::get('routes.404') === false)
		{
			// TODO: Create a standard 404 view and show it here.
			die('Page not found.');
		}
		else
		{
			list($controller, $action) = array_pad(explode('/', Config::get('routes.404')), 2, false);

			( ! $action) and $action = 'index';

			$class = 'Controller_'.$controller;
			$method = 'action_'.$action;

			if (class_exists($class))
			{
				$controller = new $class(Request::active());
				if (method_exists($controller, $method))
				{
					// Call the before method if it exists
					if (method_exists($controller, 'before'))
					{
						$controller->before();
					}

					$controller->{$method}();

					// Call the after method if it exists
					if (method_exists($controller, 'after'))
					{
						$controller->after();
					}
				}
				else
				{
					throw new Fuel_Exception('404 Action not found.');
				}
			}
			else
			{
				throw new Fuel_Exception('404 Controller not found.');
			}
		}
	}

	/**
	 * Generates a new request.  This is used for HMVC.
	 *
	 * @access	public
	 * @param	string	The URI of the request
	 * @return	object	The new request
	 */
	public static function factory($uri)
	{
		return new Request($uri);
	}

	/**
	 * @var	string	Holds the response of the request.
	 */
	public $output = NULL;

	/**
	 * @var	object	The request's URI object
	 */
	public $uri = '';

	/**
	 * @var	string	The request's controller
	 */
	public $controller = '';

	/**
	 * @var	string	The request's action
	 */
	public $action = 'index';

	public function __construct($uri)
	{
		$this->uri = new URI($uri);
	}

	public function execute()
	{
		// TODO: Write the Route class and parse the routes.
		list($controller, $action) = array_pad($this->uri->segments, 2, false);

		// Use the controller given, if empty then use the default route
		$this->controller = $controller ? $controller : Config::get('routes.default');

		// Use the action if it is sets
		$action and $this->action = $action;

		$class = 'Controller_'.ucfirst($this->controller);
		$method = 'action_'.$this->action;

		try
		{
			if (class_exists($class))
			{
				$controller = new $class($this);
				if (method_exists($controller, $method))
				{
					// Call the before method if it exists
					if (method_exists($controller, 'before'))
					{
						$controller->before();
					}

					$controller->{$method}();

					// Call the after method if it exists
					if (method_exists($controller, 'after'))
					{
						$controller->after();
					}
				}
				else
				{
					throw new Fuel_Exception('Action not found.');
				}
			}
			else
			{
				throw new Fuel_Exception('Controller not found.');
			}
		}
		catch (Fuel_Exception $e)
		{
			Request::show_404();
		}
		return $this;
	}

}

/* End of file request.php */