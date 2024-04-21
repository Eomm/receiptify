import { Artist } from './Artist';
import { Track } from './Track';

export const DisplayList = ({ data }) => {
  return <ul>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {
        data.map((item, index) => {
          switch (item.type) {
            case 'track':
              return <Track key={index} track={item} rank={index} />;
            case 'artist':
              return <Artist key={index} artist={item} rank={index} />;
          }
        })
      }
    </div>
  </ul>
}