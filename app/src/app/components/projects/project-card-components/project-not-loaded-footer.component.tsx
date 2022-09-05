import { IProjectSettings } from 'app/data/project-structure/project-info'
import { Manager } from 'app/libs/manager-n/manager.class'
import { Button } from 'app/components/shared-components/common-ui-eles/button.component'
import React from 'react'
import { Type } from 'app/components/shared-components/common-ui-eles/components.const'

interface IProjectNotLoadedFooterProps {
  project: IProjectSettings
}

export const ProjectNotLoadedFooter: React.FC<IProjectNotLoadedFooterProps> = ({ project }) => (
  <Button
    id="loadProject"
    label="Load project"
    onClick={() => Manager.loadProjectById(project.id)}
    type={Type.primary}
    fill="outline"
    marginClassName=''
  />
)
