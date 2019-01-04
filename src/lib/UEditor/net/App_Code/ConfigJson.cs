using System.Collections.Generic;

/// <summary>
/// 前后端通信相关的配置
/// </summary>
public class ConfigJson
{
    #region 上传图片配置项

    /// <summary>
    /// 执行上传图片的action名称
    /// uploadimage
    /// </summary>
    public string imageActionName { get { return "uploadimage"; } }

    /// <summary>
    /// 提交的图片表单名称
    /// upfile
    /// </summary>
    public string imageFieldName { get { return "upfile"; } }

    /// <summary>
    /// 上传大小限制，单位B
    /// 2048000
    /// </summary>
    public int imageMaxSize { get { return 2048000; } }

    /// <summary>
    /// 上传图片格式显示
    /// [ ".png", ".jpg", ".jpeg", ".gif", ".bmp" ]
    /// </summary>
    public string[] imageAllowFiles { get { return new string[] { ".png", ".jpg", ".jpeg", ".gif", ".bmp" }; } }

    /// <summary>
    /// 是否压缩图片,默认是true
    /// </summary>
    public bool imageCompressEnable { get { return true; } }

    /// <summary>
    /// 图片压缩最长边限制
    /// 1600
    /// </summary>
    public int imageCompressBorder { get { return 1600; } }

    /// <summary>
    /// 插入的图片浮动方式
    /// none
    /// </summary>
    public string imageInsertAlign { get { return "none"; } }

    /// <summary>
    /// 图片访问路径前缀
    /// Content/Controls/lib/UEditor/net/
    /// </summary>
    public string imageUrlPrefix { get { return "/Content/Controls/lib/UEditor/net/"; } }

    /// <summary>
    /// 上传保存路径,可以自定义保存路径和文件名格式
    /// {filename} 会替换成原文件名,配置这项需要注意中文乱码问题
    /// {rand:6} 会替换成随机数,后面的数字是随机数的位数
    /// {time} 会替换成时间戳 
    /// {yyyy} 会替换成四位年份 
    /// {yy} 会替换成两位年份 
    /// {mm} 会替换成两位月份 
    /// {dd} 会替换成两位日期 
    /// {hh} 会替换成两位小时 
    /// {ii} 会替换成两位分钟 
    /// {ss} 会替换成两位秒 
    /// 非法字符 \ : * ? " < > |
    /// upload/image/{yyyy}{mm}{dd}/{time}{rand:6}
    /// </summary>
    public string imagePathFormat { get { return "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}"; } }

    #endregion

    #region 涂鸦图片上传配置项

    /// <summary>
    /// 执行上传涂鸦的action名称
    /// uploadscrawl
    /// </summary>
    public string scrawlActionName { get { return "uploadscrawl"; } }

    /// <summary>
    /// 提交的图片表单名称
    /// upfile
    /// </summary>
    public string scrawlFieldName { get { return "upfile"; } }

    /// <summary>
    /// 上传保存路径,可以自定义保存路径和文件名格式
    /// upload/image/{yyyy}{mm}{dd}/{time}{rand:6}
    /// </summary>
    public string scrawlPathFormat { get { return "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}"; } }

    /// <summary>
    /// 上传大小限制，单位B
    /// 2048000
    /// </summary>
    public int scrawlMaxSize { get { return 2048000; } }

    /// <summary>
    /// 图片访问路径前缀
    /// Content/Controls/lib/UEditor/net/
    /// </summary>
    public string scrawlUrlPrefix { get { return "/Content/Controls/lib/UEditor/net/"; } }

    /// <summary>
    /// none
    /// </summary>
    public string scrawlInsertAlign { get { return "none"; } }

    #endregion

    #region 截图工具上传

    /// <summary>
    /// 执行上传截图的action名称
    /// uploadimage
    /// </summary>
    public string snapscreenActionName { get { return "uploadimage"; } }

    /// <summary>
    /// 上传保存路径,可以自定义保存路径和文件名格式
    /// upload/image/{yyyy}{mm}{dd}/{time}{rand:6}
    /// </summary>
    public string snapscreenPathFormat { get { return "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}"; } }

    /// <summary>
    /// 图片访问路径前缀
    /// Content/Controls/lib/UEditor/net/
    /// </summary>
    public string snapscreenUrlPrefix { get { return "/Content/Controls/lib/UEditor/net/"; } }

    /// <summary>
    /// 插入的图片浮动方式
    /// none
    /// </summary>
    public string snapscreenInsertAlign { get { return "none"; } }

    #endregion

    #region 抓取远程图片配置

    /// <summary>
    /// 抓取远程图片配置
    /// [ "127.0.0.1", "localhost", "img.baidu.com" ]
    /// </summary>
    public string[] catcherLocalDomain { get { return new string[] { "127.0.0.1", "localhost", "img.baidu.com"}; } }

    /// <summary>
    /// 执行抓取远程图片的action名称
    /// catchimage
    /// </summary>
    public string catcherActionName { get { return "catchimage"; } }

    /// <summary>
    /// 提交的图片列表表单名称
    /// source
    /// </summary>
    public string catcherFieldName { get { return "source"; } }

    /// <summary>
    /// 上传保存路径,可以自定义保存路径和文件名格式
    /// upload/image/{yyyy}{mm}{dd}/{time}{rand:6}
    /// </summary>
    public string catcherPathFormat { get { return "upload/image/{yyyy}{mm}{dd}/{time}{rand:6}"; } }

    /// <summary>
    /// 图片访问路径前缀
    /// Content/Controls/lib/UEditor/net/
    /// </summary>
    public string catcherUrlPrefix { get { return "/Content/Controls/lib/UEditor/net/"; } }

    /// <summary>
    /// 上传大小限制，单位B
    /// 2048000
    /// </summary>
    public int catcherMaxSize { get { return 2048000; } }

    /// <summary>
    /// 抓取图片格式显示
    /// [ ".png", ".jpg", ".jpeg", ".gif", ".bmp" ]
    /// </summary>
    public string[] catcherAllowFiles { get { return new string[] { ".png", ".jpg", ".jpeg", ".gif", ".bmp" }; } }

    #endregion

    #region 上传视频配置

    /// <summary>
    /// 执行上传视频的action名称
    /// uploadvideo
    /// </summary>
    public string videoActionName { get { return "uploadvideo"; } }

    /// <summary>
    /// 提交的视频表单名称
    /// upfile
    /// </summary>
    public string videoFieldName { get { return "upfile"; } }

    /// <summary>
    /// 上传保存路径,可以自定义保存路径和文件名格式
    /// upload/video/{yyyy}{mm}{dd}/{time}{rand:6}
    /// </summary>
    public string videoPathFormat { get { return "upload/video/{yyyy}{mm}{dd}/{time}{rand:6}"; } }

    /// <summary>
    /// 视频访问路径前缀
    /// Content/Controls/lib/UEditor/net/
    /// </summary>
    public string videoUrlPrefix { get { return "/Content/Controls/lib/UEditor/net/"; } }

    /// <summary>
    /// 上传大小限制，单位B，默认100MB
    /// 102400000
    /// </summary>
    public int videoMaxSize { get { return 102400000; } }

    /// <summary>
    /// 上传视频格式显示
    /// [".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg", ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"]
    /// </summary>
    public string[] videoAllowFiles { get { return new string[] { ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg", ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid" }; } }

    #endregion

    #region 上传文件配置

    /// <summary>
    /// controller里,执行上传视频的action名称
    /// uploadfile
    /// </summary>
    public string fileActionName { get { return "uploadfile"; } }

    /// <summary>
    /// 提交的文件表单名称
    /// upfile
    /// </summary>
    public string fileFieldName { get { return "upfile"; } }

    /// <summary>
    /// 上传保存路径,可以自定义保存路径和文件名格式
    /// upload/file/{yyyy}{mm}{dd}/{time}{rand:6}
    /// </summary>
    public string filePathFormat { get { return "upload/file/{yyyy}{mm}{dd}/{time}{rand:6}"; } }

    /// <summary>
    /// 文件访问路径前缀
    /// /ueditor/net/
    /// </summary>
    public string fileUrlPrefix { get { return "/Content/Controls/lib/UEditor/net/"; } }

    /// <summary>
    /// 上传大小限制，单位B，默认50MB
    /// 51200000
    /// </summary>
    public int fileMaxSize { get { return 51200000; } }

    /// <summary>
    /// 上传文件格式显示
    /// [".png",".jpg",".jpeg",".gif",".bmp",".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid",".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"]
    /// </summary>
    public string[] fileAllowFiles { get { return new string[] { ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg", ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid", ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml" }; } }

    #endregion

    #region 列出指定目录下的图片

    /// <summary>
    /// 执行图片管理的action名称
    /// listimage
    /// </summary>
    public string imageManagerActionName { get { return "listimage"; } }

    /// <summary>
    /// 指定要列出图片的目录
    /// upload/image
    /// </summary>
    public string imageManagerListPath { get { return "upload/image"; } }

    /// <summary>
    /// 每次列出文件数量
    /// 20
    /// </summary>
    public int imageManagerListSize { get { return 20; } }

    /// <summary>
    /// 图片访问路径前缀
    /// /ueditor/net/
    /// </summary>
    public string imageManagerUrlPrefix { get { return "/Content/Controls/lib/UEditor/net/"; } }

    /// <summary>
    /// 插入的图片浮动方式
    /// none
    /// </summary>
    public string imageManagerInsertAlign { get { return "none"; } }

    /// <summary>
    /// 列出的文件类型
    /// [ ".png", ".jpg", ".jpeg", ".gif", ".bmp" ]
    /// </summary>
    public string[] imageManagerAllowFiles { get { return new string[] { ".png", ".jpg", ".jpeg", ".gif", ".bmp" }; } }

    #endregion

    #region 列出指定目录下的文件

    /// <summary>
    /// 执行文件管理的action名称
    /// listfile
    /// </summary>
    public string fileManagerActionName { get { return "listfile"; } }

    /// <summary>
    /// 指定要列出文件的目录
    /// upload/file
    /// </summary>
    public string fileManagerListPath { get { return "upload/file"; } }

    /// <summary>
    /// 文件访问路径前缀
    /// /ueditor/net/
    /// </summary>
    public string fileManagerUrlPrefix { get { return "/Content/Controls/lib/UEditor/net/"; } }

    /// <summary>
    /// 每次列出文件数量
    /// 20
    /// </summary>
    public int fileManagerListSize { get { return 20; } }

    /// <summary>
    /// 列出的文件类型
    /// [".png",".jpg",".jpeg",".gif",".bmp",".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid",".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"]
    /// </summary>
    public string[] fileManagerAllowFiles { get { return new string[] { ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg", ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid", ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml" }; } }

    #endregion

}
