using Common.Attributes;
//using Common.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace MVC.Helper
{
    public class OperateContext
    {
        const string Admin_CookiePath = "/admin/";
        const string Admin_InfoKey = "ainfo";
        const string Admin_PermissionKey = "apermission";
        const string Admin_MenuString = "aMenuString";
        const string Admin_LogicSessionKey = "BLLSession";


        #region 0.1 Http上下文 及 相关属性
        /// <summary>
        /// Http上下文
        /// </summary>
        HttpContext ContextHttp
        {
            get
            {
                return HttpContext.Current;
            }
        }

        HttpResponse Response
        {
            get
            {
                return ContextHttp.Response;
            }
        }

        HttpRequest Request
        {
            get
            {
                return ContextHttp.Request;
            }
        }

        System.Web.SessionState.HttpSessionState Session
        {
            get
            {
                return ContextHttp.Session;
            }
        }
        #endregion

        #region 0.2 用户权限 +List<MODEL.Ou_Permission> UsrPermission
        // <summary>
        /// 用户权限
        /// </summary>
        //public List<MODEL.T_Permission> UsrPermission
        //{
        //    get
        //    {
        //        return Session[Admin_PermissionKey] as List<MODEL.T_Permission>;
        //    }
        //    set
        //    {
        //        Session[Admin_PermissionKey] = value;
        //    }
        //}
        #endregion

        public string User
        {
            get { 
                //获取当前user对象
                return "XiaoBai";
            }
        }
        #region 0.2 当前用户对象 +MODEL.Ou_UserInfo Usr
        // <summary>
        /// 当前用户对象
        /// </summary>
        //public MODEL.T_MemberInformation Usr
        //{
        //    get
        //    {
        //        return Session[Admin_InfoKey] as MODEL.T_MemberInformation;
        //    }
        //    set
        //    {
        //        Session[Admin_InfoKey] = value;
        //    }
        //}
        #endregion

        #region 0.3 业务仓储 +IBLL.IBLLSession BLLSession
        /// <summary>
        /// 业务仓储
        /// </summary>
        public IBLL.IBLLSession BLLSession;
        #endregion

        #region 1.1 实例构造函数 初始化 业务仓储
        public OperateContext()
        {
            BLLSession = DI.SpringHelper.GetObject<IBLL.IBLLSession>("BLLSession");
        }
        #endregion

        #region 1.2 获取当前 操作上下文 + OperateContext Current
        /// <summary>
        /// 获取当前 操作上下文 (为每个处理浏览器请求的服务器线程 单独创建 操作上下文)
        /// </summary>
        public static OperateContext Current//加载OperateContext实例时是不会加载这个成员的，因为是静态变量，不会出现在实例中
        {
            get
            {
                OperateContext oContext = CallContext.GetData(typeof(OperateContext).Name) as OperateContext;
                if (oContext == null)
                {
                    oContext = new OperateContext();
                    CallContext.SetData(typeof(OperateContext).Name, oContext);
                }
                return oContext;
            }
        }
        #endregion

        #region 1.3 用户登录方法 + bool UserLogin(MODEL.ViewModel.LoginUser usrPara)
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="user"></param>
        //public bool UserLogin(MODEL.ViewModel.LoginUser user)
        //{
        //    //应该到业务层查询
        //    MODEL.T_MemberInformation member = BLLSession.IMemberInformationBLL.GetListBy(u => u.StuNum == user.LoginName).FirstOrDefault();
        //    //如果登陆成功
        //    if (user != null)
        //    {
        //        Usr = member;

        //        if (user.IsAlways)
        //        {
        //            string strCookieValue = Common.SecurityHelper.EncryptUserInfo(user.LoginName);
        //            HttpCookie cookie = new HttpCookie("Admin_InfoKey", DateTime.Now.ToString());
        //            cookie.Expires = DateTime.Now.AddDays(1);
        //            Response.Cookies.Add(cookie);
        //        }
        //        return true;
        //    }
        //    return false;
        //} 
        #endregion

        #region 2.1 判断当前用户是否登陆 +bool IsLogin()
        /// <summary>
        /// 判断当前用户是否登陆 而且
        /// </summary>
        /// <returns></returns>E:\Projects\FinalWeb\DALMSSQL\BaseDAL.cs
        //public bool IsLogin()
        //{
        //    //1.验证用户是否登陆(Session && Cookie)
        //    if (Session[Admin_InfoKey] == null)//如果关闭浏览器则session已经没有，但是cookie还在
        //    {
        //        if (Request.Cookies[Admin_InfoKey] == null)
        //        {
        //            //重新登陆，内部已经调用了 Response.End(),后面的代码都不执行了！ (注意：如果Ajax请求，此处不合适！)
        //            //filterContext.HttpContext.Response.Redirect("/admin/admin/login");
        //            return false;
        //        }
        //        else//如果有cookie则从cookie中获取用户id并查询相关数据存入 SessionS
        //        {
        //            string strUserInfo = Request.Cookies[Admin_InfoKey].Value;
        //            strUserInfo = Common.SecurityHelper.DecryptUserInfo(strUserInfo);
        //            //userId即为用户学号
        //            string userId = strUserInfo;
        //            MODEL.T_MemberInformation usr = BLLSession.IMemberInformationBLL.GetListBy(u => u.StuNum == userId).First();
        //            Usr = usr;
        //            //UsrPermission = OperateContext.Current.GetUserPermission(usr.StuNum);
        //        }
        //    }
        //    return true;
        //}
        #endregion

        #region 2.2 根据学号查询权限+  public List<MODEL.T_Permission> GetUserPermission(string userId)
        /// <summary>
        /// 根据学号查询权限
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        //public List<MODEL.T_Permission> GetUserPermission(string userId)
        //{

        //    //根据学号插查询角色Id
        //    List<int> listRoleIds = BLLSession.IRoleActBLL.GetListBy(u => u.RoleActor == userId).Select(u => u.RoleId).ToList();
        //    //根据角色Id插查询权限Id
        //    List<int> listPerIds = BLLSession.IRolePermissionBLL.GetListBy(u => listRoleIds.Contains(u.RoleId)).Select(u => u.PerId).ToList();
        //    //得到权限集合
        //    List<MODEL.T_Permission> listPers = BLLSession.IPermissionBLL.GetListBy(u => listPerIds.Contains(u.PerId)).Select(u => u.ToPOCO()).ToList();
        //    return listPers;
        //} 
        #endregion

        #region  2.3 判断当前用户 是否有 访问当前页面的权限 +bool HasPemission
        /// <summary>
        /// 2.3 判断当前用户 是否有 访问当前页面的权限
        /// </summary> 
        /// <param name="areaName"></param>
        /// <param name="controllerName"></param>
        /// <param name="actionName"></param>
        /// <param name="httpMethod"></param>
        /// <returns></returns>
        //public bool HasPemission(string areaName, string controllerName, string actionName, string httpMethod)
        //{
        //var listP = from per in UsrPermission
        //            where
        //                string.Equals(per.PerAreaName, areaName, StringComparison.CurrentCultureIgnoreCase) &&
        //                string.Equals(per.PerControllerName, controllerName, StringComparison.CurrentCultureIgnoreCase) &&
        //                string.Equals(per.PerActionName, actionName, StringComparison.CurrentCultureIgnoreCase) && (
        //                    per.PerFormMethod == 3 ||//如果数据库保存的权限 请求方式 =3 代表允许 get/post请求
        //                    per.PerFormMethod == (httpMethod.ToLower() == "get" ? 1 : 2)
        //                )
        //            select per;
        //return listP.Count() > 0;
        //}
        #endregion

        #region 2.4 获取当前登陆用户的权限树Json字符串 +string UsrTreeJsonStr
        /// <summary>
        /// 获取当前登陆用户的权限树Json字符串
        /// </summary>
        //public string UsrTreeJsonStr
        //{
        //get
        //{
        //    if (Session[Admin_MenuString] == null)
        //    {
        //        //将 登陆用户的 权限集合 转成 树节点 集合（其中 IsShow = false的不要生成到树节点集合中）
        //        List<MODEL.MenuMODEL.TreeNode> listTree = MODEL.T_Permission.ToTreeNodes(UsrPermission.Where(p => p.PerIsShow == true).ToList());
        //        Session[Admin_MenuString] = Common.DataHelper.Obj2Json(listTree);
        //    }
        //    return Session[Admin_MenuString].ToString();
        //}
        //}
        #endregion

        //---------------------------------------------3.0 公用操作方法--------------------

        #region 3.1 生成 Json 格式的返回值 +ActionResult RedirectAjax(string statu, string msg, object data, string backurl)
        /// <summary>
        /// 生成 Json 格式的返回值
        /// </summary>
        /// <param name="statu"></param>
        /// <param name="msg"></param>
        /// <param name="data"></param>
        /// <param name="backurl"></param>
        /// <returns></returns>
        public ActionResult RedirectAjax(string statu, string msg, object data, string backurl)
        {
            MODEL.FormatModel.AjaxMsgModel ajax = new MODEL.FormatModel.AjaxMsgModel()
            {
                Statu = statu,
                Msg = msg,
                Data = data,
                BackUrl = backurl
            };
            JsonResult res = new JsonResult();
            res.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            res.Data = ajax;
            return res;
        }
        #endregion

        #region 3.2 重定向方法 根据Action方法特性  +ActionResult Redirect(string url, ActionDescriptor action)
        /// <summary>
        /// 重定向方法 有两种情况：如果是Ajax请求，则返回 Json字符串；如果是普通请求，则 返回重定向命令
        /// </summary>
        /// <returns></returns>
        public ActionResult Redirect(string url, ActionDescriptor action)
        {
            //如果Ajax请求没有权限，就返回 Json消息
            if (action.IsDefined(typeof(AjaxRequestAttribute), false)
            || action.ControllerDescriptor.IsDefined(typeof(AjaxRequestAttribute), false))
            {
                return RedirectAjax("nologin", "您没有登陆或没有权限访问此页面~~", null, url);
            }
            else//如果 超链接或表单 没有权限访问，则返回 302重定向命令
            {
                return new RedirectResult(url);
            }
        }
        #endregion

        //---------------------------------------------4.0 我的操作方法（霍腾）--------------------
       
    }
}
