"use client";

const boardMembers = [
  // ...existing code from your data...
];

const advisoryBoardMembers = [
  // ...existing code from your data...
];

export default function Board() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Board Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boardMembers.map((member, index) => (
            <div key={index} className="border p-4 rounded-lg shadow">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              {member.title && <p className="text-gray-700">{member.title}</p>}
              {member.credentials && <p className="text-gray-600">{member.credentials}</p>}
              <p className="text-gray-800">{member.organization}</p>
              {member.subOrganization && (
                <p className="text-gray-700 text-sm">{member.subOrganization}</p>
              )}
              <p className="text-gray-600 text-sm">{member.location}</p>
              {member.email && (
                <p className="text-red-500">
                  {Array.isArray(member.email) ? member.email.join(", ") : member.email}
                </p>
              )}
              {member.phone && (
                <p className="text-gray-700">
                  {typeof member.phone === "object"
                    ? `SK: ${member.phone.sk}, IND: ${member.phone.ind}`
                    : member.phone}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Advisory Board Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisoryBoardMembers.map((member, index) => (
            <div key={index} className="border p-4 rounded-lg shadow">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              {member.title && <p className="text-gray-700">{member.title}</p>}
              {member.credentials && <p className="text-gray-600">{member.credentials}</p>}
              <p className="text-gray-800">{member.organization}</p>
              <p className="text-gray-600 text-sm">{member.location}</p>
              {member.email && (
                <p className="text-red-500">
                  {Array.isArray(member.email) ? member.email.join(", ") : member.email}
                </p>
              )}
              {member.phone && <p className="text-gray-700">{member.phone}</p>}
              {member.additionalInfo && (
                <div className="text-gray-600 text-sm mt-2">
                  {Array.isArray(member.additionalInfo) ? (
                    <ul>
                      {member.additionalInfo.map((info, i) => (
                        <li key={i}>{info}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{member.additionalInfo}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
