const fetchModel = require("./fetchModel");

module.exports = 
{
    fetchData:function(req, res)
    {
        fetchModel.fetchData(function(data)
        {
            res.render("user-table", {userData:data});
            console.log(data);
        });
    }
}