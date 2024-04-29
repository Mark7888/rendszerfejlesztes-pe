INSERT INTO Users (Username, Name, Password) VALUES
('admin', 'Admin', 'admin'),
('user', 'User', 'user');

INSERT INTO TopicTypes (Name) VALUES
('Photography'),
('PC'),
('Media'),
('Games'),
('World'),
('Etc');

INSERT INTO Topics (Name, TypeId, Description) VALUES
('Exciting News in the World of Technology', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in mi eget magna pretium mattis. Ut euismod neque id mi rhoncus viverra.'),
('New bgbg in Health and Wellness', 2, 'asdauet, lobortis elit non, tempus leo. Integer congue libero non nisi vestibulum, vitae commodo velit eleifend.'),
('New Developments in Health and Wellness', 2, 'Sed eget risus aliquet, lobortis elit non, tempus leo. Integer congue libero non nisi vestibulum, vitae commodo velit eleifend.'),
('Recent Trends in Fashion and Style', 3, 'Aenean eget elit vehicula, vestibulum arcu vel, euismod purus. In ut commodo ipsum. Vivamus in dui auctor, fermentum felis ac, tempus sapien.');
