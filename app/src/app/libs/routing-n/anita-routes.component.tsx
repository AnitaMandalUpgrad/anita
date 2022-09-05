import React from 'react'
import { ANITA_URLS } from 'app/libs/routing-n/anita-routes.constant'
import { AddEditSectionElement } from 'app/components/project/project-add-edit-section-element.component'
import { ProjectDetails } from 'app/components/project/project-details.component'
import { SectionElementDetails } from 'app/components/project/project-section-element-details.component'
import { SectionElementsList } from 'app/components/project/project-section-elements-list.component'
import { AddEditProject } from 'app/components/projects/add-edit-project.component'
import { ProjectsNone } from 'app/components/projects/no-projects.component'
import { ProjectsList } from 'app/components/projects/projects-list.component'
import { Navigate, Route, Routes } from 'react-router-dom'

export const AnitaRoutes = () => (
  <Routes>
    <Route path={ANITA_URLS.projectsList} element={<ProjectsList />} />
    <Route path={ANITA_URLS.projectAdd} element={<AddEditProject />} />
    <Route path={ANITA_URLS.projectEdit} element={<AddEditProject />} />
    <Route path={ANITA_URLS.projectsNone} element={<ProjectsNone />} />
    <Route path={ANITA_URLS.projectDetails} element={<ProjectDetails />} />

    <Route path={ANITA_URLS.projectSectionElesList} element={<SectionElementsList />} />
    <Route path={ANITA_URLS.projectSectionEleDetails} element={<SectionElementDetails />} />
    <Route path={ANITA_URLS.projectSectionAddEle} element={<AddEditSectionElement />} />
    <Route path={ANITA_URLS.projectSectionEditEle} element={<AddEditSectionElement />} />
    <Route
      path="*" element={<Navigate to={ANITA_URLS.projectsList} />}
    />
  </Routes>
)