{
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Random Restaurant Generator\n",
    "\n",
    "### Product Overview\n",
    "This app will take user input and return a random restaurant based on the input. It will ask the location of the user, the desired price range, and the desired type of cuisine. Based on those factors it will use Google Places API to search for a restaurant and randomly select one from the list.\n",
    "\n",
    "### Specific Functionality\n",
    "There will be an index page that has a title, an input form, and the results. It will be displayed with a map, the restaurant's name and address, and a brief description of the restaurant with a photo.<br>\n",
    "\n",
    "There will be a link to click through to the restaurant's own website and another link to reviews from Google Places.<br>\n",
    "\n",
    "There will be an option to reload another random restaurant and to prevent certain restaurants from showing up again.\n",
    "\n",
    "### Data Model\n",
    "Three input components needs to be saved: location, price range, and cuisine type. These will be inputted into an Google Places API URL and results will be collected. Google Maps API will display the location of the restaurant that was randomly chosen.\n",
    "\n",
    "### Technical Components\n",
    "Python based program<br>\n",
    "Google Places API <br>\n",
    "Google Maps API\n",
    "\n",
    "### Schedule\n",
    "Start with backend and logistics, then work on design.\n",
    "\n",
    "### Further Work\n",
    "Create an account to store favorite restaurants or to show frequently visited restaurants or frequent searches and suggest something new.\n"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.6.0"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
