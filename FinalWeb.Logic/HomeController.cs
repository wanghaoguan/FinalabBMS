using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace FinalWebDB.Logic
{
    public class HomeController:Controller
    {
        /// <summary>
        /// 1.0 前后台选择页面（beta）
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

    }
}
