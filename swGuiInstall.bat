set gui_project_path=%cd%
set gui_dist_path=%gui_project_path%\dist
set gui_node_modules_path=%gui_project_path%\node_modules

if not exist %gui_node_modules_path%\ (
	npm install)

if NOT EXIST %gui_dist_path%\ (
	npm run build)

xcopy %gui_dist_path% "C:\Tomcat9.0\webapps\edu.sw.web" /s /e
pause