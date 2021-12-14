module.exports = (config) => {
    //  Passthrough the uploads folder used by forestry
    config.addPassthroughCopy('uploads');
  
    //  Passthrough the assets folder used for our css, favicon and other assets
    config.addPassthroughCopy('assets');

    //pass the packages through for the carousel and other typescript files
    config.addPassthroughCopy('packages');   

    //  Passthrough the package.json file
    config.addPassthroughCopy('package.json');
  
    //  Configure our money filter so the price will be properly displayed
    config.addFilter('money', function (value) {
      const formatter = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
      });
      return formatter.format(value);
    });

    //sort the policies based on their order
    config.addCollection("ordered-policies", collection => {
      const pols = collection.getFilteredByGlob("src/Policies/*.md")
      .sort((a, b) => {
        return Number(a.data.order) - Number(b.data.order);
      });
      return pols;
    });

    //allows for global tags to be applied along with specific tags
    config.setDataDeepMerge(true);  
  
    return {
      dir: {
        input: 'src',
      }
    };
  };