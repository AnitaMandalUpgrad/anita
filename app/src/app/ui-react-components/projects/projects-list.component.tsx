import { ANITA_URLS } from 'app/anita-routes/anita-routes.constant';
import { ProjectFileImporter } from 'app/libs/projects-helpers/file-handle-helpers/project-file-importer.class';
import { ProjectsListLoader } from 'app/libs/projects-helpers/projects-handlers/projects-list-loader.class';
import { AnitaStore } from 'app/libs/redux/reducers.const';
import { ProjectCard } from 'app/ui-react-components/projects/project-card.component';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

// Disabled rule as <a> and <button> would have different layouts
/* eslint-disable jsx-a11y/anchor-is-valid */

export const ProjectsList = () => {

  const [hasLoaded, setHasLoaded] = useState(false);
  const projects = useSelector((state: AnitaStore) => state.projects);
  const projectsLenght = Array.isArray(projects) ? projects.length : 0;

  useEffect(() => {
    let isMounted = true;
    const loadProjectsList = async () => {
      await new ProjectsListLoader().load();
      setHasLoaded(true);
    }
    if (isMounted)
      loadProjectsList();

    return () => { isMounted = false; }

  }, [projectsLenght]);

  if (Array.isArray(projects) && projects.length === 0)
    return <Navigate to={ANITA_URLS.projectsNone} />


  if (!hasLoaded)
    return <span></span>;

  return (
    <div>
      <div className="md:w-full bg-white border-b-2 rounded border-white">
        <div className="flex h-full border-t-2 border-prussian-blue-400 border-opacity-60 rounded justify-between">
          <div className="px-6 py-3">
            <h1 className="title-font text-md font-medium text-gray-900">Projects on this device</h1>
          </div>
          <div className="my-2">

            <a data-tip data-for="importProject"
              href="#"
              onClick={() => new ProjectFileImporter().import()}
              className="mx-2 my-2 text-white bg-prussian-blue-600 border-0 py-1 px-6 focus:outline-none hover:bg-prussian-blue-700 rounded font-bold text-sm"
            ><i className="bi bi-arrow-bar-down"></i>
            </a>
            <ReactTooltip id="importProject" effect="solid">
              <span>Import an existing project</span>
            </ReactTooltip>


            <Link data-tip data-for='createProject'
              to={ANITA_URLS.projectAdd}
              className="mx-2 my-2 text-white bg-prussian-blue-400 border-0 py-1 px-6 focus:outline-none hover:bg-gray-400 rounded font-bold text-sm"
            ><i className="bi bi-plus"></i>
            </Link>
            <ReactTooltip id="createProject" effect="solid">
              <span>Create a new project</span>
            </ReactTooltip>


          </div>
        </div>
      </div>
      <div className="p-1 md:w-full">
        {projects.map((project, index) => (<ProjectCard key={project.id} project={project} />))}
      </div>
    </div>
  );

};