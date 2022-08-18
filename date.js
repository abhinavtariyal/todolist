exports.getDate = function ()
{
  var date = new Date();
  var dayTime = "";
  var options = {
    weekday: "long",
    day:"numeric",
    month:"long"
  };
  dayTime = date.toLocaleDateString("en-US",options);
  return dayTime;
}
exports.getDay = function ()
{
  var date = new Date();
  var dayTime = "";
  var options = {
    weekday: "long",

  };
  dayTime = date.toLocaleDateString("en-US",options);
  return dayTime;
}
