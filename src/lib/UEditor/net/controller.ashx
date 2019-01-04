<%@ WebHandler Language="C#" Class="UEditorHandler" %>

using System;
using System.Web;
using System.IO;
using System.Collections;
using Newtonsoft.Json;

public class UEditorHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        Handler action = null;
        switch (context.Request["action"])
        {
            case "config":
                action = new ConfigHandler(context);
                break;
            case "uploadimage":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = Config.Items.imageAllowFiles,
                    PathFormat = Config.Items.imagePathFormat,
                    SizeLimit = Config.Items.imageMaxSize,
                    UploadFieldName = Config.Items.imageFieldName
                });
                break;
            case "uploadscrawl":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = new string[] { ".png" },
                    PathFormat = Config.Items.scrawlPathFormat,
                    SizeLimit = Config.Items.scrawlMaxSize,
                    UploadFieldName = Config.Items.scrawlFieldName,
                    Base64 = true,
                    Base64Filename = "scrawl.png"
                });
                break;
            case "uploadvideo":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = Config.Items.videoAllowFiles,
                    PathFormat = Config.Items.videoPathFormat,
                    SizeLimit = Config.Items.videoMaxSize,
                    UploadFieldName = Config.Items.videoFieldName
                });
                break;
            case "uploadfile":
                action = new UploadHandler(context, new UploadConfig()
                {
                    AllowExtensions = Config.Items.fileAllowFiles,
                    PathFormat = Config.Items.filePathFormat,
                    SizeLimit = Config.Items.fileMaxSize,
                    UploadFieldName = Config.Items.fileFieldName
                });
                break;
            case "listimage":
                action = new ListFileManager(context, Config.Items.imageManagerListPath, Config.Items.imageManagerAllowFiles);
                break;
            case "listfile":
                action = new ListFileManager(context, Config.Items.fileManagerListPath, Config.Items.fileManagerAllowFiles);
                break;
            case "catchimage":
                action = new CrawlerHandler(context);
                break;
            default:
                action = new NotSupportedHandler(context);
                break;
        }
        action.Process();
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}