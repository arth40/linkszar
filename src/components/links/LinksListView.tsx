import React from 'react';
import type { Link } from '../../types/link';
import LinkListCard from './LinkListCard';

const LinksListView: React.FC<{
  list: Record<string, Link>;
  view: 'list' | 'thumbnail';
}> = (props) => {
  return (
    <>
      <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {props.list &&
          Object.values(props.list).map((linkData) => (
            <LinkListCard key={linkData.id} link={linkData} view={props.view} />
          ))}
      </div>
    </>
  );
};

export default LinksListView;
