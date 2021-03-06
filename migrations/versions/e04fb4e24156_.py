"""empty message

Revision ID: e04fb4e24156
Revises: 5e4d56bebadd
Create Date: 2021-09-15 18:02:48.240100

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e04fb4e24156'
down_revision = '5e4d56bebadd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('country',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.drop_table('countries')
    op.drop_constraint('cities_countries_id_fkey', 'cities', type_='foreignkey')
    op.create_foreign_key(None, 'cities', 'country', ['countries_id'], ['id'])
    op.drop_constraint('user_countries_id_fkey', 'user', type_='foreignkey')
    op.create_foreign_key(None, 'user', 'country', ['countries_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.create_foreign_key('user_countries_id_fkey', 'user', 'countries', ['countries_id'], ['id'])
    op.drop_constraint(None, 'cities', type_='foreignkey')
    op.create_foreign_key('cities_countries_id_fkey', 'cities', 'countries', ['countries_id'], ['id'])
    op.create_table('countries',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='countries_pkey'),
    sa.UniqueConstraint('name', name='countries_name_key')
    )
    op.drop_table('country')
    # ### end Alembic commands ###
