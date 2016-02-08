using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Core;
using Umbraco.Core.Services;

namespace Our.Umbraco.CodeMirror
{
    public class SaveAsFileEventHandler : IApplicationEventHandler {
        public void OnApplicationInitialized(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext) {
        }

        public void OnApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext) {
        }

        public void OnApplicationStarting(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext) {
            ContentService.Saved += ContentService_Saved;
        }

        private void ContentService_Saved(IContentService sender, global::Umbraco.Core.Events.SaveEventArgs<global::Umbraco.Core.Models.IContent> e) {
        }
    }
}
