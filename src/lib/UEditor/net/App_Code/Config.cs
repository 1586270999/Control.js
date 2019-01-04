using System;
using System.IO;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Config 的摘要说明
/// </summary>
public static class Config
{
    private static bool noCache = true;
    private static ConfigJson BuildItems()
    {
        //string json = File.ReadAllText(HttpContext.Current.Server.MapPath("config.json"));

        //JavaScriptSerializer serializer = new JavaScriptSerializer();

        ConfigJson _json = new ConfigJson();
        //try
        //{
        //    _json = serializer.Deserialize<ConfigJson>(json);
        //}
        //catch (Exception ex)
        //{
        //    throw new Exception(ex.Message);
        //}

        return _json;
    }

    public static ConfigJson Items
    {
        get
        {
            if (noCache || _Items == null)
            {
                _Items = BuildItems();
            }
            return _Items;
        }
    }
    private static ConfigJson _Items;


    //public static T GetValue<T>(string key)
    //{
    //    return Items[key].Value<T>();
    //}

    //public static String[] GetStringList(string key)
    //{
    //    return Items[key].Select(x => x.Value<String>()).ToArray();
    //}

}