import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Layout from '../../components/Layout/Layout';
import { getProjects } from '../../services/projectsService';

const ProjectsPage: React.FC = () => {
  const { data: projects, isLoading } = useQuery('projects', getProjects);

  if (isLoading) return <Layout><div>Chargement...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🎵 Tous les Projets</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {projects?.map((project: any) => (
            <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              {project.coverImageUrl && (
                <img
                  src={project.coverImageUrl}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">Points: {project.totalPoints}</p>
                {project.currentCertification && (
                  <span className="inline-block bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-bold">
                    {project.currentCertification}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;