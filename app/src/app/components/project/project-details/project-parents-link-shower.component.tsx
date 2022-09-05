import React, { useEffect, useState } from 'react'
import { ANITA_URLS, URL_PARAMS } from 'app/libs/routing-n/anita-routes.constant'
import { urlParamFiller } from 'app/libs/routing-n/url-param-fillers.function'
import { ParentInfoForDetailsView, ISection } from 'app/data/project-structure/project-info'
import { Manager } from 'app/libs/manager-n/manager.class'
import { Button } from 'app/components/shared-components/common-ui-eles/button.component'
import { Type } from 'app/components/shared-components/common-ui-eles/components.const'

interface IProjectParentsLinkShowerProps {
  projectId: string
  parentsInfo: Array<string>
  sections: Array<ISection>
}

export const ProjectParentsLinkShower: React.FC<IProjectParentsLinkShowerProps> = ({ projectId, parentsInfo, sections }) => {
  const [parents, setParents] = useState<Array<ParentInfoForDetailsView> | undefined>([])

  useEffect(() => {
    let isMounted = true
    const getParents = async () => {
      const parents = await Manager.getCurrentProject()?.getParentInfoForDetailsView(parentsInfo)
      if (isMounted) {
        setParents(parents)
      }
    }

    if (isMounted) {
      getParents()
    }

    return (): void => {
      isMounted = false
    }
  }, [parentsInfo, projectId, sections])

  return (
    <div className="p-3 pt-0">
      <p className="text-sm text-gray-500 mb-2">Parent elements:</p>
      {parents?.map(parent => (
        <Button
          id={parent.element.id!}
          label={parent.txt}
          type={Type.secondary}
          size="sm"
          href={urlParamFiller(ANITA_URLS.projectSectionEleDetails, [
            { name: URL_PARAMS.projectId, value: projectId! },
            { name: URL_PARAMS.sectionId, value: parent.sectionId! },
            { name: URL_PARAMS.elementId, value: parent.element.id! }
          ])} key={parent.element.id}
          className="font-semibold"
        />
      ))}
    </div>
  )
}
