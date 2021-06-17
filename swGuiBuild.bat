set gui_project_path=%cd%
set gui_dist_path=%gui_project_path%\dist
set gui_node_modules_path=%gui_project_path%\node_modules
set param=%1

echo %param%

if exist %gui_dist_path%\ (
	del /f /s /q %gui_dist_path%\*.*)

if not exist %gui_node_modules_path%\ (
	npm install)

npm run build -- --appName %param%
pause